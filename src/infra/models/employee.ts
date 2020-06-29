import { Table, Column, BeforeCreate, ForeignKey, BelongsTo, BeforeBulkUpdate } from 'sequelize-typescript'
import BaseModel from './base'
import moment from 'moment'
import Company from './company'
import User from './user'

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
    instace.fullName = instace.firstName + instace.lastName
  }

  // fazer metodo BeferoBulkCreate

  @BeforeCreate
  static async splitCpfCreate (instance: Employee): Promise<void> {
    instance.cpf = instance.cpf.replace(/[^\d]+/g, '')
  }

  @BeforeBulkUpdate
  static async splitCpfUpdate ({ attributes }: { attributes: { cpf: string } }): Promise<void> {
    attributes.cpf = attributes.cpf.replace(/[^\d]+/g, '')
  }

  public async validateFirstName (firstName: string): Promise<boolean> {
    if (!firstName) {
      await this.addErrors('First Name is required')
    } else {
      if (firstName.length > 255) {
        await this.addErrors('First Name is to short')
      }
    }

    if (this.hasError) return false

    return true
  }

  public async validateLastName (lastName: string): Promise<boolean> {
    if (!lastName) {
      await this.addErrors('Last Name is required')
    } else {
      if (lastName.length > 255) {
        await this.addErrors('Last Name is to short')
      }
    }

    if (this.hasError) return false

    return true
  }

  public async validateBirthday (_birthday: string): Promise<boolean> {
    if (!this.birthday) {
      await this.addErrors('Birthday is required')
    } else {
      const dateNow = moment()
      const birthday = moment(_birthday, 'YYYY-MM-DD')

      if (birthday > dateNow || birthday === dateNow) {
        await this.addErrors('Birthday is invalid')
      }
    }

    if (this.hasError) return false

    return true
  }

  public async validateCpf (_cpf: string): Promise<boolean> {
    let response = true
    if (!_cpf) {
      await this.addErrors('Cpf is required')
    } else {
      const cpf = _cpf.replace(/[^\d]+/g, '')
      let soma
      let resto
      soma = 0
      if (cpf === '00000000000') response = false

      for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
      resto = (soma * 10) % 11

      if ((resto === 10) || (resto === 11)) resto = 0
      if (resto !== parseInt(cpf.substring(9, 10))) response = false

      soma = 0
      for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
      resto = (soma * 10) % 11

      if ((resto === 10) || (resto === 11)) resto = 0
      if (resto !== parseInt(cpf.substring(10, 11))) response = false
    }

    if (!response) {
      await this.addErrors('Cpf is invalid')
      return false
    }

    return true
  }

  public async validateCtps (_ctps: string): Promise<boolean> {
    let response = true
    if (!_ctps) {
      await this.addErrors('Ctps is required')
    } else {
      const ctps = _ctps.replace(/[^\d]+/g, '')

      if (ctps.length !== 14) response = false
    }

    if (!response) {
      await this.addErrors('Ctps is invalid')
      return false
    }

    return true
  }
}
