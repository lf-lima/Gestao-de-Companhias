import companyRepository from '../repository/company'
import Company from '../infra/models/company'

class CompanyService {
  public async create (
    data: {
    cnpj: string,
    fantasyName: string,
    fullName: string,
    userId: number,
  }
  ) {
    try {
      const responseRepository = await companyRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (
    companyId: number,
    {
      cnpj,
      fantasyName,
      fullName
    }: {
    cnpj: string
    fantasyName: string
    fullName: string
  }) {
    try {
      const company = await companyRepository.findById(companyId) || new Company()

      if (company.isEmpty()) {
        await company.addErrors('Company not exists')
        return company
      }

      const data: {
        cnpj?: string
        fantasyName?: string
        fullName?: string
      } = {}

      if (cnpj) {
        if (await company.validateCnpj(cnpj)) {
          if (await companyRepository.findByCnpj(cnpj) && company.cnpj !== cnpj) {
            await company.addErrors('CNPJ already exists in system')
          } else {
            data.cnpj = cnpj
          }
        }
      }

      if (fullName) {
        if (await company.validateFullName(fullName)) {
          if (await companyRepository.findByFullName(fullName) && company.fullName !== fullName) {
            await company.addErrors('Full name already exists in system')
          } else {
            data.fullName = fullName
          }
        }
      }

      if (fantasyName) {
        if (await company.validateFantasyName(fantasyName)) {
          data.fantasyName = fantasyName
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
        await company.addErrors('Company not exists')
      }

      return company
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByCnpj (cnpj: string) {
    try {
      const company = await companyRepository.findByCnpj(cnpj) || new Company()

      if (company.isEmpty()) {
        await company.addErrors('Company not exists')
      }

      return company
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByFullName (fullName: string) {
    try {
      const company = await companyRepository.findByFullName(fullName) || new Company()

      if (company.isEmpty()) {
        await company.addErrors('Company not exists')
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
