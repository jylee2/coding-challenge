import csv from "csv-parser";
import fs from "fs";

const getOrdersWithStores = async () => {
  const orders: any = [];
  const stores: any = [];

  await new Promise((resolve: any, reject: any) => {
    fs.createReadStream("./data/orders.csv")
      .pipe(csv())
      .on("data", (data: any) => orders.push(data))
      .on("end", () => {
        // resolve();
      });

    fs.createReadStream("./data/stores.csv")
      .pipe(csv())
      .on("data", (data: any) => stores.push(data))
      .on("end", () => {
        // const paddedOrders = orders.map((order: any) => {
        //   return {
        //     ...order,
        //     store: stores.find((store: any) => store.storeId === order.storeId),
        //   };
        // });
        // console.log("--------paddedOrders", paddedOrders?.[0]);

        // orders.forEach((order: any) => {
        //   order.store = stores.find(
        //     (store: any) => store.storeId === order.storeId
        //   );
        // });

        resolve();
      });
  });

  console.log("--------orders 1", orders?.[0]);
  console.log("--------stores 1", stores?.[0]);
  return { orders, stores };
};

export async function getSales(req: any, res: any) {
  const results = await getOrdersWithStores();
  console.log("--------results", results);

  // res.send({
  //   firstName: "Jane",
  //   lastName: "Doe",
  //   email: "janedoe@email.com",
  //   id: 1,
  // });
}
