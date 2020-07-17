import { Table, Column, ForeignKey } from 'sequelize-typescript'
import BaseModel from './base'
import Profile from './profile.model'
import Permissions from './permission.model'

@Table
export default class ProfilePermissions extends BaseModel<ProfilePermissions> {
  @ForeignKey(() => Profile)
  @Column
  profileId!: number

  @ForeignKey(() => Permissions)
  @Column
  permissionId!: number
}
