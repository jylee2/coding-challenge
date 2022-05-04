import csv from "csv-parser";
import fs from "fs";

export const getOrders = async () => {
  const orders: any = [];

  await new Promise((resolve: any, reject: any) => {
    fs.createReadStream("./data/orders.csv")
      .pipe(csv())
      .on("data", (data: any) => orders.push(data))
      .on("end", () => resolve());
  });

  return orders;
};

export const getStores = async () => {
  const stores: any = [];

  await new Promise((resolve: any, reject: any) => {
    fs.createReadStream("./data/stores.csv")
      .pipe(csv())
      .on("data", (data: any) => stores.push(data))
      .on("end", () => resolve());
  });

  return stores;
};

const getSales = async (req: any, res: any) => {
  const orders = await getOrders();
  const stores = await getStores();

  if (!orders?.length) {
    return res.send({
      orders: [],
    });
  }

  const paddedOrders = stores?.length
    ? orders.map((order: any) => ({
        ...order,
        store: stores.find((store: any) => store.storeId === order.storeId),
      }))
    : orders;

  return res.json({
    orders: paddedOrders,
  });
};

export default getSales;
