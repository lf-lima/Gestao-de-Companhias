import BaseRouter from './base'

class CompanyRouter extends BaseRouter {
  constructor () {
    super('/company')

    this.router.get('/', async (req, res) => {
      return res.json({ msg: 'OK' })
    })
  }
}

export default new CompanyRouter()
