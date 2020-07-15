import { Table, Column, BelongsToMany, HasMany } from 'sequelize-typescript'
import BaseModel from './base'
import Permissions from './permissions.model'
import ProfilePermissions from './profilePermissions.model'
import User from './user.model'

@Table
export default class Profile extends BaseModel<Profile> {
  @Column
  name!: string

  @BelongsToMany(() => Permissions, () => ProfilePermissions)
  permissions?: Permissions[]

  @HasMany(() => User)
  users?: User[]
}
