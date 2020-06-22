import { Column, BeforeCreate, BeforeUpdate, HasOne, Table } from 'sequelize-typescript'
import BaseModel from './base'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import validator from 'validator'
import Company from './company'

@Table
export default class User extends BaseModel<User> {
  @Column
  email!: string

  @Column
  password!: string

  @HasOne(() => Company)
  company?: Company

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword (instance: User): Promise<void> {
    instance.password = await bcrypt.hash(instance.password, 10).then(hash => hash)
  }

  public async validateEmail (email: string): Promise<boolean> {
    if (!email) {
      await this.addErrors('Email is required')
    } else {
      if (!validator.isEmail(email)) {
        await this.addErrors('Email is invalid')
      }
    }

    if (this.hasError) return false
    return true
  }

  public async validatePassword (password: string, confirmPassword: string): Promise<boolean> {
    if (!password || !confirmPassword) {
      await this.addErrors('Password and Confirm Password is required')
    } else {
      if (password.length <= 1) {
        await this.addErrors('Password is too short ')
      }

      if (password.length > 16) {
        await this.addErrors('Password is too long')
      }

      if (password !== confirmPassword) {
        await this.addErrors('Password and Confirm Password are diffenrent ')
      }
    }

    if (this.hasError) return false

    return true
  }

  public async checkPassword (password: string): Promise<boolean> {
    const response = bcrypt.compare(password, this.password).then(result => result)

    if (!response) {
      await this.addErrors('Password incorrect')
    }

    return response
  }

  public async genToken (payload: { id: number}): Promise<string> {
    const token = jwt.sign(payload, authConfig.secret, { expiresIn: 604800 }) // uma semana
    return token
  }
}
