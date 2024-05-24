const fetch = require("node-fetch");
import dynamicCubes from "./dynamicCubes";
import { transformDimensions, transformMeasures } from "./utils";

asyncModule(async () => {
  const schemas = await (
    await fetch("https://nocode-api.carbontech.build/customer/schemas")
  ).json();

  schemas.forEach((schema) => {
    Object.entries(dynamicCubes).forEach(([key, obj]) => {
      const cubeName = schema.split(".")[0];
      cube(cubeName, {
        ...obj,
        sql_table: schema,
        dimensions: transformDimensions(obj.dimensions || []),
        measures: transformMeasures(obj.measures || []),
      });
    });
  });
});
