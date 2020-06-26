import { Router } from 'express'
import company from './company'
import login from './login'
import user from './user'

const routers = [company, login, user]

class MainRouter {
  public router = Router()

  constructor () {
    routers.map((currentRouter) => {
      this.router.use(currentRouter.route, currentRouter.router)
    })
  }
}

export default new MainRouter().router
