import User from '../infra/models/user.model'
import userRepository from '../repository/user'
import profileService from './profile'

class UserService {
  public async create (
    data : { profileId: number, email: string, password: string, confirmPassword: string }
  ) {
    try {
      const responseRepository = await userRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (
    {
      userId, profileId, email, password, confirmPassword
    }: {
      userId: number, profileId: number, email?: string, password?: string, confirmPassword?: string
    }
  ) {
    try {
      const user = await this.findById(userId, { returnPassword: false }) || new User()

      if (user.isEmpty()) {
        return user
      }

      const data: {
        email?: string, password?: string, profileId?: number,
      } = {}

      if (email) {
        if (await this.findByEmail(email) && user.email !== email) {
          await user.addErrors('User already exists')
        } else {
          data.email = email
        }
      }

      if (password && confirmPassword) {
        data.password = password
      }

      if (profileId) {
        const profile = await profileService.findById(profileId)
        if (profile.isEmpty()) {
          await user.addErrors('Profile not exists')
        } else {
          data.profileId = profileId
        }
      }

      if (user.hasError) return user

      const responseRepository = await userRepository.update(userId, data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (userId: number, options?: { returnPassword: boolean }) {
    try {
      let user = await userRepository.findById(userId) || new User()

      if (options) {
        if (options.returnPassword === false) {
          user = await userRepository.findById(userId, { returnPassword: false }) || new User()
        }
      }

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

  public async deactivate (userId: number) {
    try {
      const user = await this.findById(userId, { returnPassword: false }) || new User()

      if (user.isEmpty()) {
        return user
      }

      await userRepository.deactivate(userId)

      return user
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new UserService()
