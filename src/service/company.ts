import companyRepository from '../repository/company'
import Company from '../infra/models/company'

class CompanyService {
  public async create (
    {
      cnpj,
      fantasyName,
      fullName,
      password,
      confirmPassword
    }: {
    cnpj: string
    fantasyName: string
    fullName: string
    password: string
    confirmPassword: string
  }) {
    try {
      const company = new Company()

      await company.validateFantasyName(fantasyName)
      await company.validateFullName(fullName)
      await company.validateCnpj(cnpj)
      await company.validatePassword(password, confirmPassword)

      if (company.hasError) return company

      if (await companyRepository.findByCnpj(cnpj)) {
        company.addErrors('CNPJ already exists in system')
      }

      if (await companyRepository.findByFullName(fullName)) {
        company.addErrors('Full name already exists in system')
      }

      if (company.hasError) return company

      const data = {
        name,
        cnpj,
        fantasyName,
        fullName,
        password: await company.hashPassword(password)
      }

      const responseRepository = await companyRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (
    company: Company,
    {
      cnpj,
      fantasyName,
      fullName,
      password,
      confirmPassword
    }: {
    cnpj: string
    fantasyName: string
    fullName: string
    password: string
    confirmPassword: string
  }) {
    try {
      const data: {
        cnpj?: string
        fantasyName?: string
        fullName?: string
        password?: string
        confirmPassword?: string
      } = {}

      if (cnpj) {
        if (await company.validateCnpj(cnpj)) {
          data.cnpj = cnpj
        }
      }

      if (fantasyName) {
        if (await company.validateFantasyName(fantasyName)) {
          data.fantasyName = fantasyName
        }
      }

      if (fullName) {
        if (await company.validateFullName(fullName)) {
          data.fullName = fullName
        }
      }

      if (password) {
        if (await company.validatePassword(password, confirmPassword)) {
          data.password = await company.hashPassword(password)
        }
      }

      const responseRepository = await companyRepository.update(company.id, data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll () {
    try {
      const companies = await companyRepository.findAll()
      return companies
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (findCompanyId: number) {
    try {
      const company = await companyRepository.findById(findCompanyId) || new Company()

      if (company.isEmpty()) {
        company.addErrors('Company not exists')
      }

      return company
    } catch (error) {
      throw new Error(error)
    }
  }

  public async delete (companyId: number) {
    try {
      await companyRepository.delete(companyId)
      return
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new CompanyService()
