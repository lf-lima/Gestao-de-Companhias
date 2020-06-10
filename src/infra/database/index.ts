import { Sequelize } from 'sequelize-typescript'
import user from '../models/user'
import post from '../models/post'

const sequelize = new Sequelize({
  database: 'db_jwt_ts_node',
  host: 'localhost',
  dialect: 'mysql',
  username: 'root',
  password: 'root',
  storage: ':memory:',
  models: [user, post],
  define: {
    underscored: true,
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  }
})

export default sequelize
