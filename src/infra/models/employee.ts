import { Table, Column, BeforeCreate, ForeignKey, BelongsTo, BeforeBulkUpdate, Scopes } from 'sequelize-typescript'
import BaseModel from './base'
import Company from './company'
import User from './user'

@Scopes(() => ({
  fromCompany: (companyId: number): any => {
    return {
      where: { companyId }
    }
  }
}))
@Table
export default class Employee extends BaseModel<Employee> {
  @Column
  firstName!: string

  @Column
  lastName!: string

  @Column
  fullName!: string

  @Column
  birthday!: Date

  @Column
  cpf!: string

  @Column
  ctps!: string

  @Column({ defaultValue: true })
  active!: boolean

  @ForeignKey(() => Company)
  companyId!: number

  @BelongsTo(() => Company)
  company?: Company

  @ForeignKey(() => User)
  userId!: number

  @BelongsTo(() => User)
  user?: User

  @BeforeCreate
  static setFullNameCreate (instace: Employee): void {
    instace.fullName = `${instace.firstName} ${instace.lastName}`
  }

  @BeforeBulkUpdate
  static async setFullNameUpdate (
    { attributes, fields }: {
      attributes: { firstName?: string, lastName?: string, fullName?: string },
      fields: string[]
    }
  ): Promise<void> {
    if (attributes.firstName && attributes.lastName) {
      fields.push('fullName')

      attributes.fullName = `${attributes.firstName} ${attributes.lastName}`
    }
  }

  @BeforeCreate
  static async splitCpfCreate (instance: Employee): Promise<void> {
    instance.cpf = instance.cpf.replace(/[^\d]+/g, '')
  }

  @BeforeBulkUpdate
  static async splitCpfUpdate ({ attributes }: { attributes: { cpf?: string } }): Promise<void> {
    if (attributes.cpf) {
      attributes.cpf = attributes.cpf.replace(/[^\d]+/g, '')
    }
  }

  @BeforeCreate
  static async splitCtpsCreate (instance: Employee): Promise<void> {
    instance.ctps = instance.ctps.replace(/[^\d]+/g, '')
  }

  @BeforeBulkUpdate
  static async splitCtpsUpdate ({ attributes }: { attributes: { ctps?: string } }): Promise<void> {
    if (attributes.ctps) {
      attributes.ctps = attributes.ctps.replace(/[^\d]+/g, '')
    }
  }
}
