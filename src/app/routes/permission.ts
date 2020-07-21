import BaseRouter from './base'
import permissionController from '../controllers/permission'
import authMiddleware from '../middlewares/authentication'

class PermissionRouter extends BaseRouter {
  constructor () {
    super('/permission')

    this.router.get('/', authMiddleware.auth, permissionController.findAll)
    this.router.get('/:findPermissionId', authMiddleware.auth, permissionController.findById)
    this.router.post('/', authMiddleware.auth, permissionController.create)
    this.router.put('/:permissionId', authMiddleware.auth, permissionController.update)
    this.router.delete('/:permissionId', authMiddleware.auth, permissionController.delete)
  }
}

export default new PermissionRouter()
