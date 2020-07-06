import BaseRouter from './base'
import companyController from '../controllers/company'
import authMiddleware from '../middlewares/authentication'

class CompanyRouter extends BaseRouter {
  constructor () {
    super('/company')

    this.router.get('/', companyController.findAll)
    this.router.get('/:findCompanyId', companyController.findById)
    this.router.post('/user', companyController.createCompanyUser)
    this.router.put('/:companyId', authMiddleware.auth, companyController.update)
    this.router.patch('/:companyId', authMiddleware.auth, companyController.deactivate)
  }
}

export default new CompanyRouter()
