import BaseRouter from './base'
import userController from '../controllers/user'

class UserRouter extends BaseRouter {
  constructor () {
    super('/user')

    this.router.get('/', userController.findAll)
    this.router.get('/:findUserId', userController.findById)
    this.router.put('/:userId', userController.update)
    this.router.delete('/:userId', userController.delete)
  }
}

export default new UserRouter()
