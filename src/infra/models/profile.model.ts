import { Table, Column, BelongsToMany } from 'sequelize-typescript'
import BaseModel from './base'
import Permissions from './permissions.model'
import ProfilePermissions from './profilePermissions.model'

@Table
export default class Profile extends BaseModel<Profile> {
  @Column
  name!: string

  @BelongsToMany(() => Permissions, () => ProfilePermissions)
  permissions?: Permissions[]
}
