import ProfilePermissions from '../infra/models/profilePermissions.model'

class ProfilePermissionsRepository {
  public async addPermission (data: {profileId: number, permissionId: number}) {
    try {
      const profilePermissionCreated = await ProfilePermissions.create(data)

      const profilePermission = await this.findById(profilePermissionCreated.id)
      return profilePermission
    } catch (error) {
      throw new Error(error)
    }
  }

  public async removePermission ({ profileId, permissionId }: {profileId: number, permissionId: number}) {
    try {
      await ProfilePermissions.destroy({ where: { profileId, permissionId } })
      return
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (profilePermissionId: number) {
    try {
      const profilePermission = await ProfilePermissions.findByPk(profilePermissionId) as ProfilePermissions
      return profilePermission
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByProfileAndPermissionId (profileId: number, permissionId: number) {
    try {
      const profilePermission = await ProfilePermissions.findOne({ where: { profileId, permissionId } }) as ProfilePermissions
      return profilePermission
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new ProfilePermissionsRepository()
