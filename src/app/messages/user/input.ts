import { IsNotEmpty, IsEmail, IsString } from 'class-validator'
import InputBase from '../base/input'

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

  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsString()
  confirmPassword!: string
}
