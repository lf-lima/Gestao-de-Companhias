import { Table, Column, BelongsToMany, HasMany, DefaultScope } from 'sequelize-typescript'
import BaseModel from './base'
import Permissions from './permissions.model'
import ProfilePermissions from './profilePermissions.model'
import User from './user.model'

@DefaultScope(() => ({
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  include: [{ model: Permissions, through: { attributes: [] } }]
}))
@Table
export default class Profile extends BaseModel<Profile> {
  @Column
  name!: string

  @BelongsToMany(() => Permissions, () => ProfilePermissions)
  permissions?: Permissions[]

  @HasMany(() => User)
  users?: User[]
}
