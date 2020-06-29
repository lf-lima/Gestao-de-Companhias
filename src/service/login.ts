import User from '../infra/models/user'
import userService from '../service/user'

class LoginService {
  public async auth ({ email, password }: { email: string, password: string }) {
    try {
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

      const token = await user.genToken({
        id: user.id
      })

      return { auth: true, token }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new LoginService()
