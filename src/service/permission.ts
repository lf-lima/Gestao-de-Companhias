import Permission from '../infra/models/permission.model'
import permissionRepository from '../repository/permissions'

class PermissionService {
  public async create ({ name, description }: { name: string, description: string}) {
    try {
      const permission = new Permission()

      if (await this.findByName(name)) {
        await permission.addErrors('Permission name already exists')
      }

      if (permission.hasError) {
        return permission
      }

      const data = {
        name,
        description
      }

      const responseRepository = await permissionRepository.create(data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (permissionId: number, { name, description }: { name?: string, description?: string}) {
    try {
      const permission = await permissionRepository.findById(permissionId)

      if (permission.isEmpty()) {
        return permission
      }

      const data: { name?: string, description?: string} = { description }

      if (name) {
        if (await this.findByName(name) && permission.name !== name) {
          await permission.addErrors('Permission name already exists')
        } else {
          data.name = name
        }
      }

      if (permission.hasError) {
        return permission
      }

      const responseRepository = await permissionRepository.update(permissionId, data)
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (permissionId: number) {
    try {
      const permission = await permissionRepository.findById(permissionId) || new Permission()

      if (permission.isEmpty()) {
        await permission.addErrors('Permission not exists ')
        return permission
      }

      return permission
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByName (permissionName: string) {
    try {
      const permission = await permissionRepository.findByName(permissionName)
      return permission
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll () {
    try {
      const responseRepository = await permissionRepository.findAll()
      return responseRepository
    } catch (error) {
      throw new Error(error)
    }
  }

  public async delete (permissionId: number) {
    try {
      const permission = await this.findById(permissionId)

      if (permission.isEmpty()) {
        return permission
      }

      await permissionRepository.delete(permissionId)
      return new Permission()
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new PermissionService()
