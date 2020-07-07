import User from '../infra/models/user.model'
import userService from '../service/user'
import employeeService from '../service/employee'
import companyService from '../service/company'

class LoginService {
  public async auth ({ email, password }: { email: string, password: string }) {
    try {
      let payload: { userId: number, userEmail: string, companyId: number }

      let user = new User()

      user = await userService.findByEmail(email) || new User()

      if (user.isEmpty()) {
        user.addErrors('User not exists')
        return { auth: false, errors: await user.getErrors() }
      }

      if (!await user.checkPassword(password, user.password)) {
        return {
          auth: false, errors: await user.getErrors()
        }
      }

      const company = await companyService.findByUserId(user.id)
      if (company.isEmpty()) {
        const employee = await employeeService.findByUserId(user.id)
        payload = { userId: user.id, userEmail: user.email, companyId: employee.companyId }
      } else {
        payload = { userId: user.id, userEmail: user.email, companyId: company.id }
      }

      const token = await user.genToken(payload)

      return { auth: true, token }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new LoginService()
