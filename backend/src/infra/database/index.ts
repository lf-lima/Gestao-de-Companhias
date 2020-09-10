import { Sequelize } from 'sequelize-typescript'
import { config } from 'dotenv'
import path from 'path'
config()

const sequelize = new Sequelize({
  database: process.env.DB,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  storage: ':memory:',
  models: [path.resolve(__dirname, '..', 'models', '*.model.ts')],
  define: {
    underscored: true,
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    scopes: {
      active: {
        where: { active: true },
        attributes: { exclude: ['active'] }
      },
      default: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  }
})

export default sequelize
