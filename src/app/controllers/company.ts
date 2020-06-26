import { Response, Request } from 'express'
import companyService from '../../service/company'
import { InputCompanyUserCreate, UserCreate, CompanyCreate } from '../messages/company/inputCompanyUserCreate'
import { InputCompanyUpdate } from '../messages/company/inputCompanyUpdate'

class CompanyController {
  public async createCompanyUser (req: Request, res: Response) {
    try {
      const inputCompanyUserCreate =
      new InputCompanyUserCreate({ user: new UserCreate(req.body.user), company: new CompanyCreate(req.body.company) })

      const errors = await inputCompanyUserCreate.validate()

      if (inputCompanyUserCreate.hasError) {
        return res.status(400).json(errors)
      }

      const responseService = await companyService.createCompanyUser(req.body.user, req.body.company)
      const { user, company } = responseService

      if (user.hasError || company.hasError) {
        return res.status(400).json({ userErrors: await user.getErrors(), companyErrors: await company.getErrors() })
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const inputCompanyUpdate =
        new InputCompanyUpdate({ ...req.body, companyId: Number(req.params.companyId) })

      const errors = await inputCompanyUpdate.validate()

      if (inputCompanyUpdate.hasError) {
        return res.status(400).json(errors)
      }

      const responseService = await companyService.update({ ...req.body, companyId: Number(req.params.companyId) })

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
