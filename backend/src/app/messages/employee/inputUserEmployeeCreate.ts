import { IsNotEmpty, IsString, Length, IsEmail, ValidateNested, MinLength, IsInt, Min } from 'class-validator'
import { IsCpf, Match } from '../../../config/decorators/others'

import InputBase from '../base/input'

export class UserCreate {
  constructor (obj: Partial<UserCreate>) {
    Object.assign(this, obj)
  }

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

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  profileId!: number
}

export class EmployeeCreate {
  constructor (obj: Partial<EmployeeCreate>) {
    Object.assign(this, obj)
  }

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  firstName!: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  lastName!: string

  @IsNotEmpty()
  birthday!: Date

  @IsNotEmpty()
  @IsString()
  @IsCpf()
  cpf!: string

  @IsNotEmpty()
  @IsString()
  ctps!: string

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  companyId!: number
}

export class InputEmployeeUserCreate extends InputBase {
  constructor (obj: Partial<InputEmployeeUserCreate>) {
    super()
    Object.assign(this, obj)
  }

  @IsNotEmpty()
  @ValidateNested()
  employee!: EmployeeCreate

  @IsNotEmpty()
  @ValidateNested()
  user!: UserCreate
}
