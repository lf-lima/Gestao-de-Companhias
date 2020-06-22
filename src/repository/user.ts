import User from '../infra/models/user'

class UserRepository {
  public async create (data: { email: string, password: string}) {
    try {
      const userCreated = await User.create(data) as User
      const user = await this.findById(userCreated.id)
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll () {
    try {
      const users = await User.findAll({ attributes: { exclude: ['password'] } }) as User[]
      return users
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (userId: number, options?: { returnPassword?: boolean}) {
    try {
      let user = await User.findByPk(userId) as User
      if (options) {
        if (options.returnPassword) {
          user = await User.findByPk(userId, { attributes: { exclude: ['password'] } }) as User
        }
      }
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByEmail (email: string) {
    try {
      const user = await User.findOne({ where: { email } }) as User
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (userId: number, data: { email?: string, password?: string}) {
    try {
      await User.update(data, { where: { id: userId } })

      const user = await this.findById(userId)
      return user
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
