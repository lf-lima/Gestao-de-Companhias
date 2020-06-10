import { Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript'
import BaseModel from './base'
import User from './user'

@Table
export default class Post extends BaseModel<Post> {
  @Column
  title!: string

  @Column
  description!: string

  @ForeignKey(() => User)
  @Column
  userId!: number

  @BelongsTo(() => User)
  user!: User

  async validateTitle (title: string): Promise<boolean> {
    if (title.length <= 1) {
      this.addErrors('Title too short')
    }

    if (this.hasError) return false

    return true
  }

  async validateDescription (description: string): Promise<boolean> {
    if (description.length <= 1) {
      this.addErrors('Description too short')
    }

    if (this.hasError) return false

    return true
  }
}
