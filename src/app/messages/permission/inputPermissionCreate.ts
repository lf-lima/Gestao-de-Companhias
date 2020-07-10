import InputBase from '../base/input'
import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class InputPermissionCreate extends InputBase {
  constructor (obj: Partial<InputPermissionCreate>) {
    super()
    Object.assign(this, obj)
  }

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name!: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  description!: string
}
