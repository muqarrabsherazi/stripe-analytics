module.exports = {
  queryRewrite: (query, { securityContext }) => {
    if (!securityContext || !securityContext.cube) {
      throw new Error("Not Found!");
    }

    const { cube } = securityContext;

    query.dimensions = query.dimensions.map((dimension) =>
      replaceCubeName(dimension, cube)
    );
    query.measures = query.measures.map((measure) =>
      replaceCubeName(measure, cube)
    );

    query.timeDimensions = query.timeDimensions.map((timeDimension) => {
      const newVal = { ...timeDimension };
      newVal.dimension = replaceCubeName(newVal.dimension, cube);
      return newVal;
    });
    query.order = replaceOrderCube(query.order, cube);

    return query;
  },
};

function replaceCubeName(query, cube) {
  return `${cube}.${query.split(".")[1]}`;
}

function replaceOrderCube(order, cube) {
  if (!!order && !!order.length) {
    return order.map((o) => {
      if (!!o && !!o.length) {
        return o.map((v) => {
          if (v.includes(".")) {
            return replaceCubeName(v, cube);
          }
          return v;
        });
      }
      return o;
    });
  }

  return order;
}
