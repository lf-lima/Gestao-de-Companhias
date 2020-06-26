import { IsNotEmpty, IsString, Length, IsEmail, ValidateNested } from 'class-validator'
import { IsCnpj, Match } from '../../../config/decorators/others'

import InputBase from '../base/input'

export class CompanyCreate {
  constructor (obj: Partial<CompanyCreate>) {
    Object.assign(this, obj)
  }

  @IsNotEmpty()
  @IsString()
  @Length(18, 18)
  @IsCnpj()
  cnpj!: string

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  fantasyName!: string

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  fullName!: string
}

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
}

export class InputCompanyUserCreate extends InputBase {
  constructor (obj: Partial<InputCompanyUserCreate>) {
    super()
    Object.assign(this, obj)
  }

  @IsNotEmpty()
  @ValidateNested()
  company!: CompanyCreate

  @IsNotEmpty()
  @ValidateNested()
  user!: UserCreate
}
