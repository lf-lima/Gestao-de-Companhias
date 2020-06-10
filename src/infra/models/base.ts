import { Model, CreatedAt, UpdatedAt, Column } from 'sequelize-typescript'

export default class BaseModel<TModel> extends Model<TModel> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id!: number

  private errors: string[] = []
  public hasError = false

  public getErrors (): string[] {
    return this.errors
  }

  public addErrors (err: string | string[]): void {
    if (Array.isArray(err)) {
      err.map((msg) => { this.errors.push(msg) })
    } else {
      this.errors.push(err)
    }

    this.hasError = true
  }

  public isEmpty (): boolean {
    if (!this.id) return true

    return false
  }

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
