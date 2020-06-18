import { Request, Response } from 'express'

class LoginController {
  public async authetication (req: Request, res: Response) {
    try {
      let company = new Company()

      if (await company.validateCnpj(cnpj)) {
        company = await companyRepository.findByCnpj(cnpj) || new Company()
      }

      if (company.hasError) {
        return { auth: false, errors: await company.getErrors() }
      }

      if (company.isEmpty()) {
        company.addErrors('Company not exists')
        return { auth: false, errors: await company.getErrors() }
      }

      await company.checkPassword(password)

      if (company.hasError) return { auth: false, errors: await company.getErrors() }

      const token = await company.genToken({
        id: company.id
      })

      return { auth: true, token }
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error ' })
    }
  }
}

export default new LoginController()
