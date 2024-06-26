export const convertStringPropToFunction = (propNames, dimensionDefinition) => {
  let newResult = { ...dimensionDefinition };
  propNames.forEach((propName) => {
    const propValue = newResult[propName];

    if (!propValue || typeof propValue === "function") {
      return;
    }

    newResult[propName] = () => propValue;
  });
  return newResult;
};

export const transformDimensions = (dimensions) => {
  return Object.keys(dimensions).reduce((result, dimensionName) => {
    const dimensionDefinition = dimensions[dimensionName];
    return {
      ...result,
      [dimensionName]: convertStringPropToFunction(
        ["sql"],
        dimensionDefinition
      ),
    };
  }, {});
};

export const transformMeasures = (measures) => {
  return Object.keys(measures).reduce((result, dimensionName) => {
    const dimensionDefinition = measures[dimensionName];
    return {
      ...result,
      [dimensionName]: convertStringPropToFunction(
        ["sql", "drill_members"],
        dimensionDefinition
      ),
    };
  }, {});
};

export const getTableName = (schema, table, isWithoutFree) => {
  const withFreeText = isWithoutFree ? "_without_free" : "";
  return `${schema}.${table}${withFreeText}`;
};
