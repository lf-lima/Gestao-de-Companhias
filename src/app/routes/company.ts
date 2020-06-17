import BaseRouter from './base'
import companyController from '../controllers/company'
import authMiddleware from '../middlewares/authentication'

class CompanyRouter extends BaseRouter {
  constructor () {
    super('/company')

    this.router.get('/', authMiddleware.company, companyController.findAll)
    this.router.get('/:findCompanyId', companyController.findById)
    this.router.post('/', companyController.create)
    this.router.put('/:companyId', authMiddleware.company, companyController.update)
    this.router.delete('/:companyId', authMiddleware.company, companyController.delete)
  }
}

export default new CompanyRouter()
