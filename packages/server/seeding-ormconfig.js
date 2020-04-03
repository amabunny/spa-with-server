/* eslint-disable */
const { createTypeOrmOptions } = require('./src/config/typeorm')
const dotenv = require('dotenv')
/* eslint-enable */

dotenv.config()

module.exports = {
  ...createTypeOrmOptions(),
  seeds: ['./src/db/seeds/**/*.ts'],
  factories: ['./src/db/factories/**/*.ts']
}
