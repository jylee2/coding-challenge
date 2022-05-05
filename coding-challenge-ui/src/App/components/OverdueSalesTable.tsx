import { Table } from "antd";
import { memo, useState, useMemo, useCallback } from "react";

import { getFlagEmoji } from "../utils";

const OverdueSalesTable = ({ orders = [], isLoading = false }: any) => {
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
        responsive: ["md"],
      },
      {
        title: "STORE",
        render: (record: any) => record.store.shopName,
        responsive: ["md"],
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
        responsive: ["md"],
      },
      {
        title: "DAYS OVERDUE",
        align: "center",
        defaultSortOrder: "descend",
        sorter: (a: any, b: any) => a.daysOverdue - b.daysOverdue,
        render: (record: any) => {
          return <div style={{ color: "red" }}>{record.daysOverdue}</div>;
        },
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
      pageSizeOptions: [5, 10],
      ...pagination,
    }),
    [onChange, onShowSizeChange, pagination, showTotal]
  );

  return (
    <Table
      size="small"
      // @ts-ignore
      columns={columns}
      loading={isLoading}
      dataSource={orders}
      pagination={paginationObj}
    />
  );
};

export default memo(OverdueSalesTable);
