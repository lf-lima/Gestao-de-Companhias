import { Router } from 'express'
import company from './company'
import login from './login'
import user from './user'
import employee from './employee'
import profile from './profile'
import permission from './permission'

const routers = [company, login, user, employee, profile, permission]

class MainRouter {
  public router = Router()

  constructor () {
    routers.map((currentRouter) => {
      this.router.use(currentRouter.route, currentRouter.router)
    })
  }
}

export default new MainRouter().router
