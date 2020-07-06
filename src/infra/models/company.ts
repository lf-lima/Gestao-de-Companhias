import { Table, Column, BeforeCreate, ForeignKey, BelongsTo, BeforeBulkUpdate } from 'sequelize-typescript'
import BaseModel from './base'
import User from './user'

@Table
export default class Company extends BaseModel<Company> {
  @Column
  cnpj!: string

  @Column
  fantasyName!: string

  @Column
  fullName!: string

  @Column({ defaultValue: true })
  active!: boolean

  @Column
  @ForeignKey(() => User)
  userId!: number

  @BelongsTo(() => User)
  user?: User

  @BeforeCreate
  static async splitCnpjCreate (instance: Company): Promise<void> {
    instance.cnpj = instance.cnpj.replace(/[^\d]+/g, '')
  }

  @BeforeBulkUpdate
  static async splitCnpjUpdate ({ attributes }: { attributes: { cnpj?: string} }): Promise<void> {
    if (attributes.cnpj) {
      attributes.cnpj = attributes.cnpj.replace(/[^\d]+/g, '')
    }
  }
}
