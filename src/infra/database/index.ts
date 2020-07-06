import { Sequelize } from 'sequelize-typescript'
import company from '../models/company'
import user from '../models/user'
import employee from '../models/employee'
import { config } from 'dotenv'
config()

const sequelize = new Sequelize({
  database: process.env.DB,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  storage: ':memory:',
  models: [user, company, employee],
  define: {
    underscored: true,
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  }
})

export default sequelize
