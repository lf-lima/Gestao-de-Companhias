import User from '../infra/models/user'

class UserRepository {
  public async create (data: { email: string, password: string}) {
    try {
      const userCreated = await User.create(data) as User
      const user = await this.findById(userCreated.id, { returnPassword: false })
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll () {
    try {
      const users = await User.scope(['default', 'active']).findAll({
        attributes: { exclude: ['password'] }
      }) as User[]
      return users
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (userId: number, options?: { returnPassword?: boolean}) {
    try {
      let user = await User.scope(['default', 'active']).findOne({ where: { id: userId } }) as User
      if (options) {
        if (options.returnPassword === false) {
          user = await User.scope(['default', 'active']).findOne({
            where: { id: userId },
            attributes: { exclude: ['password'] }
          }) as User
        }
      }
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByEmail (email: string, options?: { returnPassword?: boolean }) {
    try {
      let user = await User.findOne({ where: { email } }) as User
      if (options) {
        if (options.returnPassword === false) {
          user = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } }) as User
        }
      }
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (userId: number, data: { email?: string, password?: string}) {
    try {
      await User.update(data, { where: { id: userId } })

      const user = await this.findById(userId, { returnPassword: false })
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async deactivate (userId: number) {
    try {
      await User.update({ active: false }, { where: { id: userId } })
      return
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new UserRepository()
