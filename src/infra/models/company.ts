import { Table, Column } from 'sequelize-typescript'
import BaseModel from './base'

@Table
export default class Company extends BaseModel<Company> {
  @Column
  name!: string

  @Column
  cnpj!: number

  @Column
  fantasyName!: string

  @Column
  fullName!: string
}
