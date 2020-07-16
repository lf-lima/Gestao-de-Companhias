import BaseRouter from './base'
import permissionController from '../controllers/permission'
import authMiddleware from '../middlewares/authentication'

class PermissionRouter extends BaseRouter {
  constructor () {
    super('/permission')

    this.router.get('/', permissionController.findAll)
    this.router.get('/:findPermissionId', permissionController.findById)
    this.router.post('/', permissionController.create)
    this.router.put('/:permissionId', permissionController.update)
    this.router.delete('/:permissionId', permissionController.delete)
  }
}

export default new PermissionRouter()
