import companyRepository from '../repository/company'
import userService from '../service/user'
import profileService from '../service/profile'
import Company from '../infra/models/company.model'
import User from '../infra/models/user.model'
import Employee from '../infra/models/employee.model'

class CompanyService {
  public async createCompanyUser (
    userData: {
      profileId: number,
      email: string,
      password: string,
      confirmPassword: string
    },
    companyData: {
      cnpj: string,
      fantasyName: string,
      fullName: string
    }) {
    try {
      let user = new User()

      if (await userService.findByEmail(userData.email)) {
        await user.addErrors('Email already exists')
      }

      const profile = await profileService.findById(userData.profileId)

      if (profile.isEmpty()) {
        await user.addErrors('Profile not exists')
      }

      let company = new Company()
      if (await this.findByCnpj(companyData.cnpj)) {
        await company.addErrors('Cnpj already exists')
      }

      if (await this.findByFullName(companyData.fullName)) {
        await company.addErrors('Full company name already exists')
      }

      if (company.hasError || user.hasError) {
        return { user, company }
      }

      user = await userService.create(userData)
      company = await this.create({ ...companyData, userId: user.id })

      return { user, company }
    } catch (error) {
      throw new Error(error)
    }
  }

  public async create (
    data: {
      cnpj: string,
      fantasyName: string,
      fullName: string,
      userId: number
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
    {
      companyId,
      cnpj,
      fantasyName,
      fullName
    }: {
    companyId: number,
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
        if (await this.findByCnpj(cnpj) && company.cnpj !== cnpj) {
          await company.addErrors('CNPJ already exists in')
        } else {
          data.cnpj = cnpj
        }
      }

      if (fullName) {
        if (await this.findByFullName(fullName) && company.fullName !== fullName) {
          await company.addErrors('Full company name already exists')
        } else {
          data.fullName = fullName
        }
      }

      if (fantasyName) {
        data.fantasyName = fantasyName
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

  public async findByUserId (userId: number) {
    try {
      const employee = await companyRepository.findByUserId(userId) || new Employee()

      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByCnpj (cnpj: string) {
    try {
      cnpj = cnpj.replace(/[^\d]+/g, '')
      const company = await companyRepository.findByCnpj(cnpj)

      return company
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByFullName (fullName: string) {
    try {
      const company = await companyRepository.findByFullName(fullName)

      return company
    } catch (error) {
      throw new Error(error)
    }
  }

  public async deactivate (companyId: number) {
    try {
      const company = await this.findById(companyId)

      if (company.isEmpty()) {
        return company
      }

      await userService.deactivate(company.userId)
      await companyRepository.deactivate(companyId)

      return company
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new CompanyService()
