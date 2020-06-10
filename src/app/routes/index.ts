import loginRouter from './login'
import userRouter from './user'
import { Router } from 'express'

const routers = [loginRouter, userRouter]
const mainRouter = Router()

routers.map((currentRouter) => {
  mainRouter.use(currentRouter.route, currentRouter.router)
})

export default mainRouter
