import BaseRouter from './base'
import profileController from '../controllers/profile'
import profilePermissionsController from '../controllers/profilePermissions'
import authMiddleware from '../middlewares/authentication'
import permissionMiddleware from '../middlewares/permissions'

class ProfileRouter extends BaseRouter {
  constructor () {
    super('/profile')

    this.router.get('/', authMiddleware.auth,
      permissionMiddleware.check('findAll', profileController.restricted), profileController.findAll)
    this.router.get('/:findProfileId', authMiddleware.auth,
      permissionMiddleware.check('findById', profileController.restricted), profileController.findById)
    this.router.post('/', authMiddleware.auth,
      permissionMiddleware.check('create', profileController.restricted), profileController.create)
    this.router.put('/:profileId', authMiddleware.auth,
      permissionMiddleware.check('update', profileController.restricted), profileController.update)
    this.router.delete('/:profileId', authMiddleware.auth,
      permissionMiddleware.check('delete', profileController.restricted), profileController.delete)

    // Permissions
    this.router.post('/:profileId/permission', authMiddleware.auth,
      permissionMiddleware.check('addPermission', profilePermissionsController.restricted), profilePermissionsController.addPermission)
    this.router.delete('/:profileId/permission/:permissionId', authMiddleware.auth,
      permissionMiddleware.check('removePermission', profilePermissionsController.restricted), profilePermissionsController.removePermission)
  }
}

export default new ProfileRouter()
