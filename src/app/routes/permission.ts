import BaseRouter from './base'
import permissionController from '../controllers/permission'
import authMiddleware from '../middlewares/authentication'
import permissionMiddleware from '../middlewares/permissions'

class PermissionRouter extends BaseRouter {
  constructor () {
    super('/permission')

    this.router.get('/', authMiddleware.auth,
      permissionMiddleware.check('findAll', permissionController.restricted), permissionController.findAll)
    this.router.get('/:findPermissionId',
      permissionMiddleware.check('findById', permissionController.restricted), authMiddleware.auth, permissionController.findById)
    this.router.post('/', authMiddleware.auth,
      permissionMiddleware.check('create', permissionController.restricted), permissionController.create)
    this.router.put('/:permissionId', authMiddleware.auth,
      permissionMiddleware.check('update', permissionController.restricted), permissionController.update)
    this.router.delete('/:permissionId', authMiddleware.auth,
      permissionMiddleware.check('delete', permissionController.restricted), permissionController.delete)
  }
}

export default new PermissionRouter()
