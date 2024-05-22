// const fetch = require("node-fetch");
import dynamicCubes from "./dynamicCubes";
import { transformDimensions, transformMeasures } from "./utils";

asyncModule(async () => {
  const users = [
    { cubeName: "Old", tableName: "test_user_schema.stripe_analytics" },
    { cubeName: "New", tableName: "user_two_schema.stripe_analytics" },
  ];
  // const fetchedData = await (
  //   await fetch("https://allowing-sacred-hippo.ngrok-free.app/user-schemas")
  // ).json();

  users.forEach(({ cubeName, tableName }) => {
    Object.entries(dynamicCubes).forEach(([key, obj]) => {
      cube(`${cubeName}_${key}`, {
        ...obj,
        sql_table: tableName,
        dimensions: transformDimensions(obj.dimensions || []),
        measures: transformMeasures(obj.measures || []),
      });
    });
  });
});
