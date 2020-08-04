import BaseRouter from './base'
import userController from '../controllers/user'
import authMiddleware from '../middlewares/authentication'

class UserRouter extends BaseRouter {
  constructor () {
    super('/user')

    this.router.get('/', authMiddleware.auth, userController.findAll)
    this.router.get('/:findUserId', authMiddleware.auth, userController.findById)
    this.router.put('/:userId', authMiddleware.auth, userController.update)
    this.router.patch('/:userId', authMiddleware.auth, userController.delete)
  }
}

export default new UserRouter()
