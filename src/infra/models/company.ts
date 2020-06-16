import { Table, Column } from 'sequelize-typescript'
import BaseModel from './base'
import bcrypt from 'bcrypt'

@Table
export default class Company extends BaseModel<Company> {
  @Column
  cnpj!: string

  @Column
  fantasyName!: string

  @Column
  fullName!: string

  @Column
  password!: string

  public async validateCnpj (cnpj: string): Promise<boolean> {
    if (!cnpj) {
      this.addErrors('CNPJ is required')
    }

    if (this.hasError) return false

    return true
  }

  public async validateFantasyName (fantasyName: string): Promise<boolean> {
    if (!fantasyName) {
      this.addErrors('Fantasy Name is required')
    } else {
      if (fantasyName.length <= 1) {
        this.addErrors('Fantasy Name is too short')
      }

      if (fantasyName.length > 255) {
        this.addErrors('Fantasy Name is too long')
      }
    }

    if (this.hasError) return false

    return true
  }

  public async validateFullName (fullName: string): Promise<boolean> {
    if (!fullName) {
      this.addErrors('Full Name is required')
    } else {
      if (fullName.length <= 1) {
        this.addErrors('Full Name is too short')
      }

      if (fullName.length > 255) {
        this.addErrors('Full Name is too long')
      }
    }

    if (this.hasError) return false

    return true
  }

  public async validatePassword (password: string, confirmPassword: string): Promise<boolean> {
    if (!password || !confirmPassword) {
      this.addErrors('Password and Confirm Password is required')
    } else {
      if (password.length <= 1) {
        this.addErrors('Password is too short ')
      }

      if (password.length > 16) {
        this.addErrors('Password is too long')
      }

      if (password !== confirmPassword) {
        this.addErrors('Password and Confirm Password are diffenrent ')
      }
    }

    if (this.hasError) return false

    return true
  }

  public async hashPassword (password: string): Promise<string> {
    const hashedPassword = bcrypt.hash(password, 10).then(hash => hash)
    return hashedPassword
  }

  public async comparePassword (password: string): Promise<boolean> {
    if (password !== this.password) {
      return false
    }

    return true
  }
}
