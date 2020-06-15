import companyRepository from '../repository/company'

class CompanyService {
  public async create (data: {
    name: string,
    cnpj: number,
    fantasyName: string,
    fullName: string,
    password: string,
  }) {
    const responseRepository = await companyRepository.create(data)
    return responseRepository
  }
}

export default new CompanyService()
