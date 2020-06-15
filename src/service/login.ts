import employeeRepository from '../repository/employee'
import Employee from '../infra/models/employee'

interface LoginData {
  email: string
  password: string
}

interface LoginResponse {
  auth: boolean
  errors?: string[]
  token?: string
}

class LoginService {
  public async authenticate ({ email, password }: LoginData): Promise<LoginResponse> {
    const employee = await employeeRepository.findByEmail(email) ||
                  new Employee()

    if (employee.isEmpty()) {
      employee.addErrors('User not exists')
      return { auth: false, errors: employee.getErrors() }
    }

    await employee.checkPassword(password, employee.password)

    if (employee.hasError) return { auth: false, errors: employee.getErrors() }

    const token = await employee.genToken({
      id: employee.id,
      email: user.email
    })

    return { auth: true, token }
  }
}

export default new LoginService()
