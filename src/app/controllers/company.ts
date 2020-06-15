import { Response, Request } from 'express'
import companyService from '../../service/company'

class CompanyController {
  public async create (req: Request, res: Response) {
    try {
      const responseService = await companyService.create(req.body)
      return responseService
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Errror' })
    }
  }
}

export default new CompanyController()
