import { Response, Request } from 'express'
import companyService from '../../service/company'

class CompanyController {
  public async create (req: Request, res: Response) {
    try {
      const responseService = await companyService.create(req.body)

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Errror' })
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const responseService = await companyService.update(req.company, req.body)

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Errror' })
    }
  }

  public async findAll (req: Request, res: Response) {
    try {
      const responseService = await companyService.findAll()

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error' })
    }
  }

  public async findById (req: Request, res: Response) {
    try {
      const responseService = await companyService.findById(Number(req.params.findCompanyId))

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error' })
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      await companyService.delete(Number(req.params.companyId))

      return res.status(204).json()
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error' })
    }
  }
}

export default new CompanyController()
