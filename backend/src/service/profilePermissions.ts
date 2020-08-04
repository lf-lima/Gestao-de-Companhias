import ProfilePermissions from '../infra/models/profilePermissions.model'
import profilePermissionsRepository from '../repository/profilePermissions'
import permissionService from '../service/permission'
import profileService from '../service/profile'

class ProfilePermissionsService {
  public async addPermission (profileId: number, permissionId: number) {
    try {
      const profilePermission = new ProfilePermissions()

      const profile = await profileService.findById(profileId)

      if (profile.isEmpty()) {
        await profilePermission.addErrors(`Profile of id ${profileId} does not exists`)
      }

      const permission = await permissionService.findById(permissionId)

      if (permission.isEmpty()) {
        await profilePermission.addErrors(`Permission of id ${permissionId} does not exists`)
      }

      if (profilePermission.hasError) {
        return profilePermission
      }

      const responseRepository = await profilePermissionsRepository.addPermission({ profileId, permissionId })
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async removePermission (profileId: number, permissionId: number) {
    try {
      const profilePermission = await profilePermissionsRepository.findByProfileAndPermissionId(profileId, permissionId) || new ProfilePermissions()

      if (profilePermission.isEmpty()) {
        await profilePermission.addErrors(`This id ${profileId} profile dont have this id ${permissionId} permission`)
        return profilePermission
      }

      await profilePermissionsRepository.removePermission({ profileId, permissionId })

      return new ProfilePermissions()
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new ProfilePermissionsService()
