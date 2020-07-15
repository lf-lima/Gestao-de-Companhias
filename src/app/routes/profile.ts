import BaseRouter from './base'
import profileController from '../controllers/profile'
import profilePermissionsController from '../controllers/profilePermissions'
import authMiddleware from '../middlewares/authentication'

class ProfileRouter extends BaseRouter {
  constructor () {
    super('/profile')

    this.router.get('/', profileController.findAll)
    this.router.get('/:findProfileId', profileController.findById)
    this.router.post('/', profileController.create)
    this.router.put('/:profileId', profileController.update)
    this.router.delete('/:profileId', profileController.delete)

    // Permissions
    this.router.post('/:profileId/permission', profilePermissionsController.addPermission)
    this.router.delete('/:profileId/permission/:permissionId', profilePermissionsController.removePermission)
  }
}

export default new ProfileRouter()
