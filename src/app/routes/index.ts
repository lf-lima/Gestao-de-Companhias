import loginRouter from './login'
import userRouter from './user'
import { Router } from 'express'

const routers = [loginRouter, userRouter]

class MainRouter {
  public router = Router()

  constructor () {
    routers.map((currentRouter) => {
      this.router.use(currentRouter.route, currentRouter.router)
    })
  }
}

export default new MainRouter().router
