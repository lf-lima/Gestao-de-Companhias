import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator'
import InputBase from '../base/input'
import { IsUserEmailAlreadyExist } from '../../../config/decorators/user'
import { Match } from '../../../config/decorators/others'

export class InputUserCreate extends InputBase {
  constructor ({
    email, password, confirmPassword
  }: {
    email:string, password: string, confirmPassword: string
  }) {
    super()
    this.email = email
    this.password = password
    this.confirmPassword = confirmPassword
  }

  @IsUserEmailAlreadyExist()
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password!: string

  @IsNotEmpty()
  @IsString()
  @Match('password', {
    message: 'Password and confirmPassword are different'
  })
  confirmPassword!: string
}
