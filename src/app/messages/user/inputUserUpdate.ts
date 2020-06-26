import { IsEmail, IsString, Length } from 'class-validator'
import InputBase from '../base/input'
import { Match } from '../../../config/decorators/others'

export class InputUserUpdate extends InputBase {
  constructor (obj: Partial<InputUserUpdate>) {
    super()
    Object.assign(this, obj)
  }

  @IsEmail()
  email?: string

  @IsString()
  @Length(6, 16)
  password?: string

  @IsString()
  @Match('password', {
    message: 'Password and confirmPassword are different'
  })
  confirmPassword?: string
}
