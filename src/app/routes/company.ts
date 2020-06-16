import BaseRouter from './base'
import companyController from '../controllers/company'

class CompanyRouter extends BaseRouter {
  constructor () {
    super('/company')

    this.router.post('/', companyController.create)
  }
}

export default new CompanyRouter()
