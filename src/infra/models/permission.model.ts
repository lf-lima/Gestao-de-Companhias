import { Table, Column, BelongsToMany } from 'sequelize-typescript'
import BaseModel from './base'
import Profile from './profile.model'
import ProfilePermissions from './profilePermissions.model'

@Table
export default class Permissions extends BaseModel<Permissions> {
  @Column
  name!: string

  @Column
  description!: string

  @BelongsToMany(() => Profile, () => ProfilePermissions)
  profiles?: Profile[]
}
