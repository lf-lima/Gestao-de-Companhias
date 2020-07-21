import BaseRouter from './base'
import companyController from '../controllers/company'
import authMiddleware from '../middlewares/authentication'
import permissionMiddleware from '../middlewares/permissions'

class CompanyRouter extends BaseRouter {
  constructor () {
    super('/company')

    this.router.get('/', authMiddleware.auth, permissionMiddleware.check('findAll', companyController.restricted), companyController.findAll)
    this.router.get('/:findCompanyId', authMiddleware.auth, companyController.findById)
    this.router.post('/user', companyController.createCompanyUser)
    this.router.put('/:companyId', authMiddleware.auth, companyController.update)
    this.router.patch('/:companyId', authMiddleware.auth, companyController.deactivate)
  }
}

export default new CompanyRouter()
