export default {
  sql_table: `stripe_analytics`,

  data_source: `default`,

  joins: {},

  dimensions: {
    month: {
      sql: `month`,
      type: `string`,
    },

    year: {
      sql: `year`,
      type: `string`,
    },

    unit_amount: {
      sql: `unit_amount`,
      type: `string`,
    },

    customer_id: {
      sql: `customer_id`,
      type: `string`,
    },

    customer_email: {
      sql: `customer_email`,
      type: `string`,
    },

    product_name: {
      sql: `product_name`,
      type: `string`,
    },

    subscription_start: {
      sql: `subscription_start`,
      type: `time`,
    },

    subscription_end: {
      sql: `subscription_end`,
      type: `time`,
    },
  },

  measures: {
    count: {
      type: `count`,
    },

    new_customer_invoice_amount: {
      sql: `new_customer_invoice_amount`,
      type: `sum`,
    },

    reactivated_invoice_amount: {
      sql: `reactivated_invoice_amount`,
      type: `sum`,
    },

    upgraded_invoice_amount: {
      sql: `upgraded_invoice_amount`,
      type: `sum`,
    },

    downgraded_invoice_amount: {
      sql: `downgraded_invoice_amount`,
      type: `sum`,
    },

    voluntary_invoice_amount: {
      sql: `voluntary_invoice_amount`,
      type: `sum`,
    },

    delinquent_churned_invoice_amount: {
      sql: `delinquent_churned_invoice_amount`,
      type: `sum`,
    },
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
};
