import Employee from '../infra/models/employee'

class EmployeeRepository {
  public async create (
    data: {
      firstName: string,
      lastName: string,
      birthday: Date,
      cpf: string,
      ctps: string,
      companyId: number,
      userId: number
    }
  ) {
    try {
      const employeeCreated = await Employee.create(data)

      const employee = await this.findById(employeeCreated.id, employeeCreated.companyId)
      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (
    employeeId: number,
    companyId: number,
    data: {
      firstName?: string,
      lastName?: string,
      birthday?: Date,
      cpf?: string,
      ctps?: string
    }
  ) {
    try {
      await Employee.update(data, { where: { id: employeeId } })

      const employee = await this.findById(employeeId, companyId)
      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (employeeId: number, companyId: number) {
    try {
      const employee = await Employee.scope(['default', 'active']).findOne({
        where: {
          id: employeeId,
          companyId
        }
      }) as Employee

      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByUserId (userId: number) {
    try {
      const employee = await Employee.scope(['default', 'active']).findOne({ where: { userId } })
      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByCpf (cpf: string) {
    try {
      const employee = await Employee.findOne({ where: { cpf } }) as Employee
      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByCtps (ctps: string) {
    try {
      const employee = await Employee.findOne({ where: { ctps } }) as Employee
      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll (companyId: number) {
    try {
      const employees = await Employee.scope(['default', 'active', { method: ['fromCompany', companyId] }]).findAll() as Employee[]
      return employees
    } catch (error) {
      throw new Error(error)
    }
  }

  public async deactivate (employeeId: number, companyId: number) {
    try {
      await Employee.update({ active: false }, {
        where: {
          id: employeeId,
          companyId
        }
      })
      return
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new EmployeeRepository()
