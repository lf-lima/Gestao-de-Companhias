import Permission from '../infra/models/permissions.model'

class PermissionsRepository {
  public async create (data: { name: string, description: string }) {
    try {
      const permissionCreated = await Permission.create(data)
      const permission = await this.findById(permissionCreated.id)
      return permission
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update (permissionId: number, data: { name?: string, description?: string}) {
    try {
      await Permission.update(data, { where: { id: permissionId } })

      const permission = await this.findById(permissionId)
      return permission
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findById (permissionId: number) {
    try {
      const permission = await Permission.findByPk(permissionId) as Permission
      return permission
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findAll () {
    try {
      const permissions = await Permission.findAll() as Permission[]
      return permissions
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findByName (permissionName: string) {
    try {
      const permission = await Permission.findOne({ where: { name: permissionName } }) as Permission
      return permission
    } catch (error) {
      throw new Error(error)
    }
  }

  public async delete (permissionId: number) {
    try {
      await Permission.destroy({ where: { id: permissionId } })
      return
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new PermissionsRepository()
