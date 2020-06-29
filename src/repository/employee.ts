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

      const employee = await this.findById(employeeCreated.id)
      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (
    employeeId: number,
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

      const employee = await this.findById(employeeId)
      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (employeeId: number) {
    try {
      const employee = await Employee.findByPk(employeeId) as Employee
      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll () {
    try {
      const employees = await Employee.findAll() as Employee[]
      return employees
    } catch (error) {
      throw new Error(error)
    }
  }

  public async delete (employeeId: number) {
    try {
      await Employee.destroy({ where: { id: employeeId } })
      return
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new EmployeeRepository()
