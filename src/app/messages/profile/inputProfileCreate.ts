import InputBase from '../base/input'
import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class InputProfileCreate extends InputBase {
  constructor (obj: Partial<InputProfileCreate>) {
    super()
    Object.assign(this, obj)
  }

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name!: string
}
