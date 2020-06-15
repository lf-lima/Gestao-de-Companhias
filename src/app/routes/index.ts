import { Router } from 'express'
import company from './company'

const routers = [company]

class MainRouter {
  public router = Router()

  constructor () {
    routers.map((currentRouter) => {
      this.router.use(currentRouter.route, currentRouter.router)
    })
  }
}

export default new MainRouter().router
