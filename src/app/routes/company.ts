import BaseRouter from './base'
import companyController from '../controllers/company'
import authMiddleware from '../middlewares/authentication'
import permissionMiddleware from '../middlewares/permissions'

class CompanyRouter extends BaseRouter {
  constructor () {
    super('/company')

    this.router.get('/', authMiddleware.auth,
      permissionMiddleware.check('findAll', companyController.restricted), companyController.findAll)
    this.router.get('/:findCompanyId', authMiddleware.auth,
      permissionMiddleware.check('findById', companyController.restricted), companyController.findById)
    this.router.post('/user', companyController.createCompanyUser)
    this.router.put('/:companyId', authMiddleware.auth,
      permissionMiddleware.check('update', companyController.restricted), companyController.update)
    this.router.patch('/:companyId', authMiddleware.auth,
      permissionMiddleware.check('deactivate', companyController.restricted), companyController.deactivate)
  }
}

export default new CompanyRouter()
