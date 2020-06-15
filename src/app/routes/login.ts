import loginController from '../controllers/login'
import BaseRouter from './base'

class LoginRouter extends BaseRouter {
  constructor () {
    super('/login')

    this.router.get('/', loginController.authenticate)
  }
}

export default new LoginRouter()
