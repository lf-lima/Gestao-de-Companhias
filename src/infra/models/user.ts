import { Table, Column, DefaultScope, HasMany } from 'sequelize-typescript'
import BaseModel from './base'
import Post from './post'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

interface TokenPayload {
  id: number
  username: string
  email: string
}

@DefaultScope({
  attributes: { exclude: ['createdAt', 'updatedAt'] }
})
@Table
export default class User extends BaseModel<User> {
  @Column
  username!: string

  @Column
  email!: string

  @Column
  password!: string

  @HasMany(() => Post)
  posts!: Post[]

  public async validateEmail (email: string): Promise<boolean> {
    if (!validator.isEmail(email)) this.addErrors('Invalid Email')

    if (this.hasError) return false

    return true
  }

  public async validateUsername (username: string): Promise<boolean> {
    if (username.length <= 4) this.addErrors('Username too short')

    if (username.length > 16) this.addErrors('Username too long')

    if (this.hasError) return false

    return true
  }

  public async validatePassword (password: string, confirmPassword: string): Promise<boolean> {
    if (password !== confirmPassword) this.addErrors('Different passwords')

    if (password.length < 4) this.addErrors('Password too short')

    if (password.length > 16) this.addErrors('Password too long')

    if (this.hasError) return false

    return true
  }

  public async hashPassword (password: string): Promise<string> {
    const saltRounds = 10
    const hashedPassword = bcrypt.hash(password, saltRounds).then((hash) => hash)
    return hashedPassword
  }

  public async checkPassword (passwordBody: string, passwordDb: string): Promise<boolean> {
    const response = bcrypt.compare(passwordBody, passwordDb).then((result) => result)

    if (!response) this.addErrors('Invalid Password')

    return response
  }

  public async genToken (payload: TokenPayload): Promise<string> {
    const token = jwt.sign(payload, authConfig.secret, {
      expiresIn: 86400 // expira em um dia
    })
    return token
  }
}
