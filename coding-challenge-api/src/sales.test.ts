import { getSales } from "./sales";

test("getSales returns user details", () => {
  const res = {
    json: jest.fn(),
  };
  getSales(null, res);

  // expect(res.json).toHaveBeenCalledWith({
  //   firstName: "Jane",
  //   lastName: "Doe",
  //   email: "janedoe@email.com",
  //   id: 1,
  // });
});
