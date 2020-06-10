import User from '../infra/models/user'

interface UserData {
  username?: string
  email?: string
  password?: string
}

interface FindUserOptions {
  returnPassword?: boolean
}

class UserRepository {
  public async store (data: UserData) {
    try {
      const userCreated = await User.create(data)
      const user = await this.findById(userCreated.id, { returnPassword: false })
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (userId: number, data: UserData) {
    try {
      await User.update(data, { where: { id: userId } })
      const user = await this.findById(userId, { returnPassword: false })
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByEmail (email: string, options?: FindUserOptions) {
    try {
      let user = new User()
      if (options) {
        if (options.returnPassword === false) {
          user = await User.findOne({
            where: { email },
            attributes: { exclude: ['password'] }
          }) as User
        }
      } else {
        user = await User.findOne({
          where: { email }
        }) as User
      }

      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByUsername (username: string, options?: FindUserOptions) {
    try {
      let user = new User()
      if (options) {
        if (options.returnPassword === false) {
          user = await User.findOne({
            where: { username },
            attributes: { exclude: ['password'] }
          }) as User
        }
      } else {
        user = await User.findOne({
          where: { username }
        }) as User
      }

      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (userId: number, options?: FindUserOptions) {
    try {
      let user = new User()
      if (options) {
        if (options.returnPassword === false) {
          user = await User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password'] }
          }) as User
        }
      } else {
        user = await User.findOne({
          where: { id: userId }
        }) as User
      }

      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll (options?: FindUserOptions) {
    try {
      let users: User[] = []
      if (options) {
        if (options.returnPassword === false) {
          users = await User.findAll({
            attributes: { exclude: ['password'] }
          }) as User[]
        }
      } else {
        users = await User.findAll() as User[]
      }

      return users
    } catch (error) {
      throw new Error(error)
    }
  }

  public async delete (userId: number) {
    try {
      await User.destroy({ where: { id: userId } })
      return
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new UserRepository()
