// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'mattmaxwell',
      user:     'postgres',
      password: 'password'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'mattmaxwell',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'mattmaxwell',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
