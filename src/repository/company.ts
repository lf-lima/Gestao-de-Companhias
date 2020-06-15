import Company from '../infra/models/company'

class CompanyRepository {
  public async create (data: {
    name: string,
    cnpj: number,
    fantasyName: string,
    fullName: string,
    password: string,
  }) {
    try {
      const company = await Company.create(data)
      return company
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (companyId: number) {
    try {
      const company = await Company.findByPk(companyId)
      return company
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new CompanyRepository()
