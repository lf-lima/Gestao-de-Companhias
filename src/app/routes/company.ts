import BaseRouter from './base'
import companyController from '../controllers/company'

class CompanyRouter extends BaseRouter {
  constructor () {
    super('/company')

    this.router.get('/', companyController.findAll)
    this.router.get('/:findCompanyId', companyController.findById)
    this.router.post('/user', companyController.createCompanyUser)
    this.router.put('/:companyId', companyController.update)
    this.router.delete('/:companyId', companyController.delete)
  }
}

export default new CompanyRouter()
