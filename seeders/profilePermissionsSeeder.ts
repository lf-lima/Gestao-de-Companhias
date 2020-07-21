import profileService from '../src/service/profile'
import permissionService from '../src/service/permission'
import profilePermissionsService from '../src/service/profilePermissions'

class ProfilePermissionsSeeder {
  private profiles = [
    {
      name: 'admin'
    },
    {
      name: 'userCompany'
    },
    {
      name: 'adminEmployee'
    },
    {
      name: 'userEmployee'
    }
  ]

  private permissions = [
    {
      name: 'createCompany',
      description: 'admissed create company'
    },
    {
      name: 'listCompany',
      description: 'admissed list companies'
    },
    {
      name: 'createEmployee::mine',
      description: 'admissed create employee'
    },
    {
      name: 'createEmployee::all',
      description: 'admissed create employee'
    },
    {
      name: 'listEmployee::mine',
      description: 'admissed list employees'
    },
    {
      name: 'listEmployee::all',
      description: 'admissed list employees'
    },
    {
      name: 'newFeature',
      description: 'new feature'
    },
    {
      name: 'createProfile',
      description: 'admissed create profile'
    },
    {
      name: 'listProfile',
      description: 'admissed list profile'
    },
    {
      name: 'createPermission',
      description: 'admissed create permission'
    },
    {
      name: 'listPermission',
      description: 'admissed list permission'
    }
  ]

  private profilePermissions = [
    {
      profileName: 'admin',
      permissionsNames: [
        'createCompany',
        'listCompany',
        'createEmployee::all',
        'listEmployee::all',
        'newFeature',
        'createProfile',
        'createPermission'
      ]
    },
    {
      profileName: 'userCompany',
      permissionsNames: [
        'createCompany',
        'listCompany',
        'createEmployee::mine',
        'listEmployee::mine',
        'newFeature'
      ]
    },
    {
      profileName: 'adminEmployee',
      permissionsNames: [
        'createEmployee::mine',
        'listEmployee::mine',
        'newFeature'
      ]
    },
    {
      profileName: 'userEmployee',
      permissionsNames: [
        'newFeature'
      ]
    }
  ]

  public async run () {
    for (const profile of this.profiles) {
      await profileService.create(profile)
    }

    for (const permission of this.permissions) {
      await permissionService.create(permission)
    }

    for (const profilePermissions of this.profilePermissions) {
      const { profileName, permissionsNames } = profilePermissions

      const profile = await profileService.findByName(profileName)

      for (const permissionName of permissionsNames) {
        const permission = await permissionService.findByName(permissionName)

        await profilePermissionsService.addPermission(profile.id, permission.id)
      }
    }
  }
}

export default new ProfilePermissionsSeeder()
