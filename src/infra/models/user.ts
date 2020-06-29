import { Column, BeforeCreate, BeforeUpdate, HasOne, Table } from 'sequelize-typescript'
import BaseModel from './base'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import Company from './company'

@Table
export default class User extends BaseModel<User> {
  @Column
  email!: string

  @Column
  password!: string

  @HasOne(() => Company)
  company?: Company

  @BeforeUpdate // nao ta funcionando
  @BeforeCreate
  static async hashPassword (instance: User): Promise<void> {
    instance.password = await bcrypt.hash(instance.password, 10).then(hash => hash)
  }

  public async checkPassword (password: string, passwordDb: string): Promise<boolean> {
    const response = await bcrypt.compare(password, passwordDb).then(result => result)

    if (!response) {
      await this.addErrors('Password incorrect')
    }

    return response
  }

  public async genToken (payload: { id: number, email: string }): Promise<string> {
    const token = jwt.sign(payload, authConfig.secret, { expiresIn: 604800 }) // uma semana
    return token
  }
}
