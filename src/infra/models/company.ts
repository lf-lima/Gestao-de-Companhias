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

  @Column
  password!: string

  public async validateName (name: string): Promise<boolean> {
    if (!name) {
      console.log('aishduashduashd')
    }

    if (name.length <= 1) {
      this.addErrors('Name is too short')
    }

    if (name.length > 64) {
      this.addErrors('Name is too long')
    }

    if (this.hasError) return false

    return true
  }

  // public async validateCnpj (cnpj: number) {

  // }

  // public async validateFantasyName (fantasyName: string) {

  // }

  // public async validateFullName (fullName: string) {

  // }

  // public async validatePassword (password: string, confirmPassword: string) {

  // }
}
