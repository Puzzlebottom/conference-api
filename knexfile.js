// Update with your config settings.

export default {

  development: {
    client: 'pg',
    connection: 'postgres://app_dev:e1bc9e7f864d@localhost:5433/app_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://app_dev:e1bc9e7f864d@localhost:5433/app_test'
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {rejectUnauthorized: false},
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}

