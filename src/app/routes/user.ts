import userController from '../controllers/user'
import { BaseRouter } from './base'
import authMiddleware from '../middlewares/authentication'

class UserRouter extends BaseRouter {
  constructor () {
    super('/users')

    this.router.get('/', authMiddleware, userController.findAll)
    this.router.get('/:userId', authMiddleware, userController.findById)
    this.router.post('/', userController.store)
    this.router.put('/', authMiddleware, userController.update)
    this.router.delete('/', authMiddleware, userController.delete)
  }
}

export default new UserRouter()
