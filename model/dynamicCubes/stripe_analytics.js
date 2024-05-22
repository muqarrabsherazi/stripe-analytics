export default {
  sql_table: `stripe_analytics`,

  data_source: `default`,

  joins: {},

  dimensions: {
    month: {
      sql: "month",
      type: "number",
    },
    year: {
      sql: "year",
      type: "number",
    },
    customer_id: {
      sql: "customer_id",
      type: "string",
    },
    customer_email: {
      sql: "customer_email",
      type: "string",
    },
    subscription_start: {
      sql: "subscription_start",
      type: "time",
    },
    subscription_end: {
      sql: "subscription_end",
      type: "time",
    },
    product_name: {
      sql: "product_name",
      type: "string",
    },
    unit_moment: {
      sql: "unit_moment",
      type: "number",
    },
    new_customer: {
      sql: "new_customer",
      type: "number",
    },
    new_customer_invoice_amount: {
      sql: "new_customer_invoice_amount",
      type: "number",
    },
    new_customer_mrr: {
      sql: "new_customer_mrr",
      type: "number",
    },
    reactivated_customer: {
      sql: "reactivated_customer",
      type: "number",
    },
    reactivated_invoice_amount: {
      sql: "reactivated_invoice_amount",
      type: "number",
    },
    reactivated_mrr: {
      sql: "reactivated_mrr",
      type: "number",
    },
    upgraded_customer: {
      sql: "upgraded_customer",
      type: "number",
    },
    upgraded_invoice_amount: {
      sql: "upgraded_invoice_amount",
      type: "number",
    },
    upgraded_mrr: {
      sql: "upgraded_mrr",
      type: "number",
    },
    downgraded_customer: {
      sql: "downgraded_customer",
      type: "number",
    },
    downgraded_invoice_amount: {
      sql: "downgraded_invoice_amount",
      type: "number",
    },
    downgraded_mrr: {
      sql: "downgraded_mrr",
      type: "number",
    },
    voluntary_churned_customer: {
      sql: "voluntary_churned_customer",
      type: "number",
    },
    voluntary_invoice_amount: {
      sql: "voluntary_invoice_amount",
      type: "number",
    },
    voluntary_churned_mrr: {
      sql: "voluntary_churned_mrr",
      type: "number",
    },
    delinquent_churned_customer: {
      sql: "delinquent_churned_customer",
      type: "number",
    },
    delinquent_churned_invoice_amount: {
      sql: "delinquent_churned_invoice_amount",
      type: "number",
    },
    delinquent_churned_mrr: {
      sql: "delinquent_churned_mrr",
      type: "number",
    },
  },

  measures: {
    count_of_new_customers: {
      sql: "customer_id",
      type: "count",
      filters: [
        {
          sql: (CUBE) => `${CUBE}.new_customer = 1`,
        },
      ],
    },
    count_of_voluntary_churned_customers: {
      sql: "customer_id",
      type: "count",
      filters: [
        {
          sql: (CUBE) => `${CUBE}.voluntary_churned_customer = 1`,
        },
      ],
    },
    count_of_upgraded_customers: {
      sql: "customer_id",
      type: "count",
      filters: [
        {
          sql: (CUBE) => `${CUBE}.upgraded_customer = 1`,
        },
      ],
    },
    count_of_downgraded_customers: {
      sql: "customer_id",
      type: "count",
      filters: [
        {
          sql: (CUBE) => `${CUBE}.downgraded_customer = 1`,
        },
      ],
    },
    count_of_reactivated_customers: {
      sql: "customer_id",
      type: "count",
      filters: [
        {
          sql: (CUBE) => `${CUBE}.reactivated_customer = 1`,
        },
      ],
    },
    count_of_delinquent_churned_customers: {
      sql: "customer_id",
      type: "count",
      filters: [
        {
          sql: (CUBE) => `${CUBE}.delinquent_churned_customer = 1`,
        },
      ],
    },

    existing_customer: {
      title: `Existing Customer`,
      type: `number`,
      sql: (CUBE) =>
        `SUM(${CUBE["count_of_new_customers"]}::NUMERIC - coalesce(${CUBE["count_of_voluntary_churned_customers"]}::NUMERIC, 0) + coalesce(${CUBE["count_of_reactivated_customers"]}::NUMERIC, 0) - coalesce(${CUBE["count_of_delinquent_churned_customers"]}::NUMERIC, 0)) over (order by ${CUBE["year"]}, ${CUBE["month"]})`,
    },

    mrr_of_new_customers: {
      sql: "new_customer_mrr",
      type: "sum",
      filters: [
        {
          sql: (CUBE) => `${CUBE}.new_customer = 1`,
        },
      ],
    },
    mrr_of_voluntary_churned_customers: {
      sql: "voluntary_churned_mrr",
      type: "sum",
      filters: [
        {
          sql: (CUBE) => `${CUBE}.voluntary_churned_customer = 1`,
        },
      ],
    },
    mrr_of_upgraded_customers: {
      sql: "upgraded_mrr",
      type: "sum",
      filters: [
        {
          sql: (CUBE) => `${CUBE}.upgraded_customer = 1`,
        },
      ],
    },
    mrr_of_downgraded_customers: {
      sql: "downgraded_mrr",
      type: "sum",
      filters: [
        {
          sql: (CUBE) => `${CUBE}.downgraded_customer = 1`,
        },
      ],
    },
    mrr_of_reactivated_customers: {
      sql: "reactivated_mrr",
      type: "sum",
      filters: [
        {
          sql: (CUBE) => `${CUBE}.reactivated_customer = 1`,
        },
      ],
    },
    mrr_of_delinquent_churned_customers: {
      sql: "delinquent_churned_mrr",
      type: "sum",
      filters: [
        {
          sql: (CUBE) => `${CUBE}.delinquent_churned_customer = 1`,
        },
      ],
    },

    existing_mrr: {
      title: `Existing MRR`,
      type: `number`,
      sql: (CUBE) =>
        `SUM(${CUBE["mrr_of_new_customers"]} + coalesce(${CUBE["mrr_of_voluntary_churned_customers"]}, 0) + coalesce(${CUBE["mrr_of_upgraded_customers"]}, 0) + coalesce(${CUBE["mrr_of_downgraded_customers"]}, 0) + coalesce(${CUBE["mrr_of_reactivated_customers"]}, 0) + coalesce(${CUBE["mrr_of_delinquent_churned_customers"]}, 0)) over (order by ${CUBE["year"]}, ${CUBE["month"]})`,
    },
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
};
