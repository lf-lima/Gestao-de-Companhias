import userRepository from '../repository/user'
import User from '../infra/models/user'

interface UserDataStore {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface UserDataUpdate {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}

class UserService {
  public async store ({ username, email, password, confirmPassword }: UserDataStore) {
    try {
      const user = new User()
      await user.validateUsername(username)
      await user.validateEmail(email)
      await user.validatePassword(password, confirmPassword)

      if (user.hasError) return user

      if (await userRepository.findByEmail(email)) {
        user.addErrors('Email already exists')
      }
      if (await userRepository.findByUsername(username)) {
        user.addErrors('Username already exists')
      }

      if (user.hasError) return user

      const data = {
        username,
        email,
        password: await user.hashPassword(password)
      }

      const responseRepository = await userRepository.store(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (user: User, userId: number, { username, email, password, confirmPassword }: UserDataUpdate) {
    try {
      if (user.id !== userId) {
        user.addErrors('Not authorized')
        return user
      }

      const data: UserDataUpdate = {}

      if (username) {
        if (await user.validateUsername(username)) {
          if (await userRepository.findByUsername(username) && user.username !== username) {
            user.addErrors('Username already exists')
          } else {
            data.username = username
          }
        }
      }

      if (email) {
        if (await user.validateEmail(email)) {
          if (await userRepository.findByEmail(email) && user.email !== email) {
            user.addErrors('Email already exists')
          } else {
            data.email = email
          }
        }
      }

      if (password && confirmPassword) {
        if (await user.validatePassword(password, confirmPassword)) {
          data.password = await user.hashPassword(password)
        }
      }

      if (user.hasError) return user

      const responseRepository = await userRepository.update(user.id, data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll () {
    try {
      const responseRepository = await userRepository.findAll({ returnPassword: false })
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (userId: number) {
    try {
      const user = await userRepository.findById(userId, { returnPassword: false }) ||
                   new User()

      if (user.isEmpty()) user.addErrors('User not exists')

      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async delete (user: User, userId: number) {
    try {
      if (user.id !== userId) {
        user.addErrors('Not authorized')
        return user
      }

      await userRepository.delete(user.id)
      return user
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new UserService()
