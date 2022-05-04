import differenceInDays from "date-fns/differenceInDays";

const getDollarValueString = (orderValue: string) => {
  if (!orderValue) return;

  const valueArray = orderValue.split(".");

  if (!valueArray?.[1]) return `$${orderValue}.00`;

  if (valueArray[1].length === 1) return `$${orderValue}0`;

  return `$${orderValue}`;
};

const getDaysOverdue = (order: any) => {
  if (!order.latest_ship_date) return;

  let [day, month, year] = order.latest_ship_date.split("/");

  const diffDays = differenceInDays(
    new Date(),
    new Date(`${month} ${day}, ${year} 00:00:00`)
  );

  return diffDays;
};

export const formatOrders = (orders: any) => {
  if (!orders?.length) return;

  return orders.map((order: any, index: number) => {
    return {
      key: `${order.Id}-${index}`,
      ...order,
      orderValue: getDollarValueString(order.orderValue),
      daysOverdue: getDaysOverdue(order),
    };
  });
};

export const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return;

  const codePoints = countryCode
    .trim()
    .toUpperCase()
    .split("")
    .map((char: string) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};
