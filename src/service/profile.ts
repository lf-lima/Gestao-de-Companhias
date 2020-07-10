import profileRepository from '../repository/profile'
import Profile from '../infra/models/profile.model'

class ProfileService {
  public async create ({ name }: { name: string }) {
    try {
      const profile = new Profile()

      if (await this.findByName(name)) {
        await profile.addErrors('Profile name already exists')
      }

      if (profile.hasError) {
        return profile
      }

      const data = {
        name
      }

      const responseRepository = await profileRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error()
    }
  }

  public async update (profileId: number, { name }: { name?: string }) {
    try {
      const profile = await this.findById(profileId)

      if (profile.isEmpty()) {
        return profile
      }

      const data: { name?: string } = {}

      if (name) {
        if (await this.findByName(name) && profile.name !== name) {
          await profile.addErrors('Profile name already exists')
        } else {
          data.name = name
        }
      }

      if (profile.hasError) {
        return profile
      }

      const responseRepository = await profileRepository.update(profileId, data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (profileId: number) {
    try {
      const profile = await profileRepository.findById(profileId) || new Profile()

      if (profile.isEmpty()) {
        await profile.addErrors('Profile not exists')
      }

      return profile
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByName (profileName: string) {
    try {
      const profile = await profileRepository.findByName(profileName)
      return profile
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll () {
    try {
      const responseRepository = await profileRepository.findAll()
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async delete (profileId: number) {
    try {
      const profile = await this.findById(profileId)

      if (profile.isEmpty()) {
        return profile
      }

      await profileRepository.delete(profileId)
      return new Profile()
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new ProfileService()
