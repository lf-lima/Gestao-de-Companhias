import { IsEmail, IsString, Length, IsOptional, IsInt, Min } from 'class-validator'
import InputBase from '../base/input'
import { Match } from '../../../config/decorators/others'

export class InputUserUpdate extends InputBase {
  constructor (obj: Partial<InputUserUpdate>) {
    super()
    Object.assign(this, obj)
  }

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  @Length(6, 16)
  password?: string

  @Match('password', {
    message: 'Password and confirmPassword are different'
  })
  @IsOptional()
  @IsString()
  confirmPassword?: string

  @IsOptional()
  @IsInt()
  @Min(1)
  profileId!: number
}
