import { memo, useState, useEffect, useMemo, useCallback } from "react";
import { Table, Typography } from "antd";

import config from "../config";
import { formatOrders } from "../utils";

const OverdueSales = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns = useMemo(
    () => [
      {
        title: "MARKETPLACE",
        render: (record: any) => record.store.marketplace,
      },
      {
        title: "STORE",
        render: (record: any) => record.store.shopName,
      },
      {
        title: "ORDER ID",
        dataIndex: "orderId",
      },
      {
        title: "ORDER VALUE",
        dataIndex: "orderValue",
        align: "right",
      },
      {
        title: "ITEMS",
        dataIndex: "items",
        align: "center",
      },
      {
        title: "DESTINATION",
        dataIndex: "destination",
      },
      {
        title: "DAYS OVERDUE",
        dataIndex: "daysOverdue",
        defaultSortOrder: "descend",
        sorter: (a: any, b: any) => a.age - b.age,
      },
    ],
    []
  );

  // const onChange = useCallback(
  //   (pagination: any, filters: any, sorter: any, extra: any) => {
  //     console.log("params", pagination, filters, sorter, extra);
  //   },
  //   []
  // );

  const getRowKey = useCallback((record: any, index: number): string => {
    return `${record.Id}-${index}`;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const resp = await fetch(`${config.apiUrl}/sales`, {
          method: "GET",
        });

        const body = await resp.json();

        if (!body?.orders?.length) {
          return setIsLoading(false);
        }

        setOrders(formatOrders(body.orders));
        setIsLoading(false);
      } catch (error) {
        console.error("--------query sales error", error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Typography.Paragraph>Overdue Orders</Typography.Paragraph>
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={orders}
        // onChange={onChange}
        loading={isLoading}
        // @ts-ignore
        rowKey={getRowKey}
      />
    </>
  );
};

export default memo(OverdueSales);
