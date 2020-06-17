import Company from '../infra/models/company'

interface FindCompanyOptions {
  returnPassword?: boolean
}

class CompanyRepository {
  public async create (data: {
    cnpj: string,
    fantasyName: string,
    fullName: string,
    password: string,
  }) {
    try {
      const companyCreated = await Company.create(data)

      const company = await this.findById(companyCreated.id)
      return company
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (companyId: number, data: {
    cnpj?: string,
    fantasyName?: string,
    fullName?: string,
    password?: string,
  }) {
    try {
      await Company.update(data, { where: { id: companyId } })

      const company = await this.findById(companyId)
      return company
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll () {
    try {
      const companies = await Company.findAll({ attributes: { exclude: ['password'] } }) as Company[]
      return companies
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (companyId: number, options?: FindCompanyOptions): Promise<Company> {
    try {
      let company = await Company.findByPk(companyId) as Company
      if (options) {
        if (options.returnPassword === false) {
          company = await Company.findByPk(companyId, { attributes: { exclude: ['password'] } }) as Company
        }
      }
      return company
    } catch (error) {
      throw new Error(error)
    }
  }

  public async delete (companyId: number) {
    try {
      await Company.destroy({ where: { id: companyId } })
      return
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByCnpj (companyCnpj: string) {
    try {
      const company = await Company.findOne({ where: { cnpj: companyCnpj } }) as Company
      return company
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByFullName (companyFullName: string) {
    try {
      const company = await Company.findOne({ where: { fullName: companyFullName } }) as Company
      return company
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new CompanyRepository()
