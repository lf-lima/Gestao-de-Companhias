import { Column, BeforeCreate, HasOne, Table, BeforeBulkUpdate, ForeignKey, BelongsTo, Scopes } from 'sequelize-typescript'
import BaseModel from './base'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import Company from './company.model'
import Profile from './profile.model'

@Scopes(() => ({
  includeProfile: {
    include: [Profile]
  }
}))
@Table
export default class User extends BaseModel<User> {
  @Column
  email!: string

  @Column
  password!: string

  @Column({ defaultValue: true })
  active!: boolean

  @HasOne(() => Company)
  company?: Company

  @ForeignKey(() => Profile)
  @Column
  profileId!: number

  @BelongsTo(() => Profile)
  profile?: Profile

  @BeforeCreate
  static async hashPasswordCreate (instance: User): Promise<void> {
    instance.password = await bcrypt.hash(instance.password, 10).then(hash => hash)
  }

  @BeforeBulkUpdate
  static async hashPasswordUpdate ({ attributes }: { attributes: { password?: string }}): Promise<void> {
    if (attributes.password) {
      attributes.password = await bcrypt.hash(attributes.password, 10).then(hash => hash)
    }
  }

  public async checkPassword (password: string, passwordDb: string): Promise<boolean> {
    const response = await bcrypt.compare(password, passwordDb).then(result => result)

    if (!response) {
      await this.addErrors('Password incorrect')
    }

    return response
  }

  public async genToken (payload: {
    userId: number,
    userEmail: string,
    companyId: number,
    permissions: { id: number, name:string, description: string}[]
  }): Promise<string> {
    const token = jwt.sign(payload, authConfig.secret, { expiresIn: 604800 }) // uma semana
    return token
  }
}
