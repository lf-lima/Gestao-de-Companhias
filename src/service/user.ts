import User from '../infra/models/user'
import userRepository from '../repository/user'

class UserService {
  public async create (
    data : { email: string, password: string, confirmPassword: string }
  ) {
    try {
      const responseRepository = await userRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (
    userId: number,
    {
      email, password, confirmPassword
    }: {
      email?: string, password?: string, confirmPassword?: string
    }
  ) {
    try {
      const user = await userRepository.findById(userId, { returnPassword: false }) || new User()

      if (user.isEmpty()) {
        await user.addErrors('User not exists')
        return user
      }

      const data: {
        email?: string, password?: string
      } = {}

      if (email) {
        if (await user.validateEmail(email)) {
          if (await userRepository.findByEmail(email)) {
            await user.addErrors('User already exists')
          } else {
            data.email = email
          }
        }
      }

      if (password && confirmPassword) {
        if (await user.validatePassword(password, confirmPassword)) {
          data.password = password
        }
      }

      if (user.hasError) return user

      const responseRepository = await userRepository.update(userId, data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (userId: number) {
    try {
      const user = await userRepository.findById(userId, { returnPassword: false }) || new User()

      if (user.isEmpty()) {
        await user.addErrors('User not exists')
      }

      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByEmail (email: string, options?:{ returnPassword: boolean }) {
    try {
      let user = await userRepository.findByEmail(email)

      if (options) {
        if (options.returnPassword === false) {
          user = await userRepository.findByEmail(email, { returnPassword: false })
        }
      }

      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll () {
    try {
      const users = await userRepository.findAll()
      return users
    } catch (error) {
      throw new Error(error)
    }
  }

  public async delete (userId: number) {
    try {
      const user = await userRepository.findById(userId, { returnPassword: false }) || new User()

      if (user.isEmpty()) {
        await user.addErrors('User not exists')
        return user
      }

      await userRepository.delete(userId)

      return new User()
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new UserService()
