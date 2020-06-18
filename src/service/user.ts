import User from '../infra/models/user'
import userRepository from '../repository/user'

class UserService {
  public async create (
    {
      username, password, confirmPassword
    }: {
      username: string, password: string, confirmPassword: string
    }
  ) {
    try {
      const user = new User()

      await user.validateUsername(username)
      await user.validatePassword(password, confirmPassword)

      if (await userRepository.findByUsername(username)) {
        await user.addErrors('User already exists')
      }

      if (user.hasError) return user

      const data = {
        username,
        password
      }

      const responseRepository = await userRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (
    userId: number,
    {
      username, password, confirmPassword
    }: {
      username?: string, password?: string, confirmPassword?: string
    }
  ) {
    try {
      const user = await userRepository.findById(userId, { returnPassword: false }) || new User()

      if (user.isEmpty()) {
        await user.addErrors('User not exists')
        return user
      }

      const data: {
        username?: string, password?: string
      } = {}

      if (username) {
        if (await user.validateUsername(username)) {
          if (await userRepository.findByUsername(username)) {
            await user.addErrors('User already exists')
          } else {
            data.username = username
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
