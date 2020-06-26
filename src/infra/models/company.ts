import { Table, Column, BeforeUpdate, BeforeCreate, ForeignKey, BelongsTo } from 'sequelize-typescript'
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

  @Column
  @ForeignKey(() => User)
  userId!: number

  @BelongsTo(() => User)
  user?: User

  @BeforeUpdate
  @BeforeCreate
  static async splitCnpj (instance: Company): Promise<void> {
    instance.cnpj = instance.cnpj.replace(/[^\d]+/g, '')
  }
}
