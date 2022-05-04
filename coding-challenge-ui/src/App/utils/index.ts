const getDollarValueString = (orderValue: string) => {
  if (!orderValue) return;

  const valueArray = orderValue.split(".");

  if (!valueArray?.[1]) return `$${orderValue}.00`;

  if (valueArray[1].length === 1) return `$${orderValue}0`;

  return `$${orderValue}`;
};

const getDaysOverdue = (order: any) => {
  return order.latest_ship_date;
};

export const formatOrders = (orders: any) => {
  if (!orders?.length) return;

  return orders.map((order: any) => {
    return {
      ...order,
      orderValue: getDollarValueString(order.orderValue),
      daysOverdue: getDaysOverdue(order),
    };
  });
};
