import employeeRepository from '../repository/employee'
import userService from '../service/user'
import companyService from '../service/company'
import Employee from '../infra/models/employee'
import User from '../infra/models/user'

class EmployeeService {
  public async createEmployeeUser (
    userData: {
      email: string,
      password: string,
      confirmPassword: string
    },
    employeeData: {
      firstName: string,
      lastName: string,
      birthday: Date,
      cpf: string,
      ctps: string,
      companyId: number
    }
  ) {
    try {
      let user = new User()

      if (await userService.findByEmail(userData.email)) {
        await user.addErrors('Email already exists')
      }

      let employee = new Employee()

      if (await this.findByCpf(employeeData.cpf)) {
        await employee.addErrors('Cpf already exists')
      }

      if (await this.findByCtps(employeeData.ctps)) {
        await employee.addErrors('Ctps already exists')
      }

      const company = await companyService.findById(employeeData.companyId)

      if (company.isEmpty()) {
        await employee.addErrors('Company not exists')
      }

      if (user.hasError || employee.hasError) {
        return { user, employee }
      }

      user = await userService.create(userData)
      employee = await this.create({ ...employeeData, userId: user.id })

      return { user, employee }
    } catch (error) {
      throw new Error(error)
    }
  }

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
      const responseRepository = await employeeRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (
    {
      employeeId,
      firstName,
      lastName,
      birthday,
      cpf,
      ctps,
      companyId
    }: {
      employeeId: number,
      firstName?: string,
      lastName?: string,
      birthday?: Date,
      cpf?: string,
      ctps?: string,
      companyId: number
    }
  ) {
    try {
      const employee = await this.findById(employeeId, companyId)

      if (employee.isEmpty()) {
        return employee
      }

      if (employee.companyId !== companyId) {
        await employee.addErrors('Not authorized')
        return employee
      }

      const data: {
        firstName?: string,
        lastName?: string,
        birthday?: Date,
        cpf?: string,
        ctps?: string,
        userId?: number
      } = {}

      if (firstName) {
        data.firstName = firstName
      }

      if (lastName) {
        data.lastName = lastName
      }

      if (birthday) {
        data.birthday = birthday
      }

      if (cpf) {
        if (await this.findByCpf(cpf) && employee.cpf !== cpf) {
          await employee.addErrors('Cpf already exists')
        } else {
          data.cpf = cpf
        }
      }

      if (ctps) {
        if (await this.findByCtps(ctps) && employee.ctps !== ctps) {
          await employee.addErrors('Ctps already exists')
        } else {
          data.ctps = ctps
        }
      }

      if (employee.hasError) {
        return employee
      }

      const responseRepository = await employeeRepository.update(employeeId, companyId, data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (employeeId: number, companyId: number) {
    try {
      const employee = await employeeRepository.findById(employeeId, companyId) || new Employee()

      if (employee.isEmpty()) {
        await employee.addErrors('Employee not exists')
        return employee
      }

      if (employee.companyId !== companyId) {
        await employee.addErrors('Not authorized')
        return employee
      }

      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByUserId (userId: number) {
    try {
      const employee = await employeeRepository.findByUserId(userId) || new Employee()

      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByCpf (cpf: string) {
    try {
      cpf = cpf.replace(/[^\d]+/g, '')
      const employee = await employeeRepository.findByCpf(cpf)
      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByCtps (ctps: string) {
    try {
      ctps = ctps.replace(/[^\d]+/g, '')
      const employee = await employeeRepository.findByCtps(ctps)

      return employee
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll (companyId: number) {
    try {
      const responseRepository = await employeeRepository.findAll(companyId)

      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async deactivate (employeeId: number, companyId: number) {
    try {
      const employee = await this.findById(employeeId, companyId)

      if (employee.isEmpty()) {
        return employee
      }

      await userService.deactivate(employee.userId)
      await employeeRepository.deactivate(employeeId, companyId)

      return employee
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new EmployeeService()
