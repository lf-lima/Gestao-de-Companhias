import Permissions from '../infra/models/permissions.model'
import Profile from '../infra/models/profile.model'

class ProfileRepository {
  public async create (data: { name: string }) {
    try {
      const profileCreated = await Profile.create(data)

      const profile = await this.findById(profileCreated.id)
      return profile
    } catch (error) {
      throw new Error()
    }
  }

  public async findById (profileId: number) {
    try {
      const profile = await Profile.findByPk(profileId) as Profile
      return profile
    } catch (error) {
      throw new Error()
    }
  }

  public async findByName (profileName: string) {
    try {
      const profile = await Profile.findOne({ where: { name: profileName } }) as Profile
      return profile
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll () {
    try {
      const profiles = await Profile.findAll({ include: [{ model: Permissions, through: { attributes: [] } }] }) as Profile[]
      return profiles
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (profileId: number, data: { name?: string }) {
    try {
      await Profile.update(data, { where: { id: profileId } })

      const profile = await this.findById(profileId)
      return profile
    } catch (error) {
      throw new Error(error)
    }
  }

  public async delete (profileId: number) {
    try {
      await Profile.destroy({ where: { id: profileId } })
      return
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new ProfileRepository()
