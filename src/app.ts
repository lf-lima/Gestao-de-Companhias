import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './app/routes/index'
import sequelize from './infra/database/index'

class App {
  public server: express.Application

  public constructor () {
    this.server = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  public middlewares (): void {
    this.server.use(bodyParser.urlencoded({ extended: true }))
    this.server.use(cors())
    this.server.use(express.json())
  }

  public async database (): Promise<void> {
    await sequelize.sync({ force: true })
  }

  public routes (): void {
    this.server.use(routes)
  }
}

export default new App()
