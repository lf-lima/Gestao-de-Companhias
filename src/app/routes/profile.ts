import BaseRouter from './base'
import profileController from '../controllers/profile'
import authMiddleware from '../middlewares/authentication'

class ProfileRouter extends BaseRouter {
  constructor () {
    super('/profile')

    this.router.get('/', authMiddleware.auth, profileController.findAll)
    this.router.get('/:findProfileId', authMiddleware.auth, profileController.findById)
    this.router.post('/', authMiddleware.auth, profileController.create)
    this.router.put('/:profileId', authMiddleware.auth, profileController.update)
    this.router.delete('/:profileId', authMiddleware.auth, profileController.delete)
  }
}

export default new ProfileRouter()
