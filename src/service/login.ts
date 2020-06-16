import companyRepository from '../repository/company'
import Company from '../infra/models/company'
import { ifError } from 'assert'

interface LoginResponse {
  auth: boolean
  errors?: string[]
  token?: string
}

class LoginService {
  public async company ({ cnpj, password }: { cnpj: string, password: string}): Promise<LoginResponse> {
    let company = new Company()

    if (await company.validateCnpj(cnpj)) {
      company = await companyRepository.findByCnpj(cnpj) || new Company()
    }

    if (company.hasError) {
      return { auth: false, errors: company.getErrors() }
    }

    if (company.isEmpty()) {
      company.addErrors('Company not exists')
      return { auth: false, errors: company.getErrors() }
    }

    await company.checkPassword(password)

    if (company.hasError) return { auth: false, errors: company.getErrors() }

    const token = await company.genToken({
      id: company.id
    })

    return { auth: true, token }
  }
}

export default new LoginService()
