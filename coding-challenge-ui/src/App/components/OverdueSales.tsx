import { memo, useState, useEffect, useMemo, useCallback } from "react";
import { Row, Table, Typography } from "antd";

import config from "../config";
import { formatOrders, getFlagEmoji } from "../utils";

const OverdueSales = ({ style }: any) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  const columns = useMemo(
    () => [
      {
        title: "MARKETPLACE",
        render: (record: any) => {
          const flag = getFlagEmoji(record.store.country.slice(0, 2));
          return (
            <div
              style={{
                fontWeight: "normal",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {`${flag} ${record.store.marketplace}`}
            </div>
          );
        },
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
        sorter: (a: any, b: any) => a.daysOverdue - b.daysOverdue,
      },
    ],
    []
  );

  const onChange = useCallback((current: number, pageSize: number) => {
    setPagination({ current, pageSize });
  }, []);

  const showTotal = useCallback((total: any, range: any) => {
    return `${range[0]} - ${range[1]} of ${total}`;
  }, []);

  const onShowSizeChange = useCallback((current: number, pageSize: number) => {
    setPagination({ current, pageSize });
  }, []);

  const paginationObj = useMemo(
    () => ({
      showSizeChanger: true,
      onChange,
      showTotal,
      onShowSizeChange,
      pageSizeOptions: [5, 10, 20, 50],
      ...pagination,
    }),
    [onChange, onShowSizeChange, pagination, showTotal]
  );

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
    <Row style={style}>
      <Typography.Paragraph strong>Overdue Orders</Typography.Paragraph>
      <Table
        size="small"
        // @ts-ignore
        columns={columns}
        loading={isLoading}
        dataSource={orders}
        pagination={paginationObj}
      />
    </Row>
  );
};

export default memo(OverdueSales);
