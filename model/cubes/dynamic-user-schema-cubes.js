// const fetch = require("node-fetch");
import dynamicCubes from "./dynamicCubes";
import { getTableName, transformDimensions, transformMeasures } from "./utils";

asyncModule(async () => {
  const users = [
    { schemaName: "test_user_schema", isWithFreePlan: false },
    { schemaName: "user_two_schema", isWithFreePlan: false },
  ];
  // const fetchedData = await (
  //   await fetch("https://allowing-sacred-hippo.ngrok-free.app/user-schemas")
  // ).json();

  users.forEach(({ schemaName, isWithFreePlan }) => {
    Object.entries(dynamicCubes).forEach(([key, obj]) => {
      cube(`${schemaName}_${key}`, {
        ...obj,
        sql_table: getTableName(schemaName, obj.sql_table, isWithFreePlan),
        dimensions: transformDimensions(obj.dimensions || []),
        measures: transformMeasures(obj.measures || []),
      });
    });
  });
});
