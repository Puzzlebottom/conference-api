// Update with your config settings.

export default {

  development: {
    client: 'pg',
    connection: 'postgres://app_dev:e1bc9e7f864d@localhost:5433/app_dev'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
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

