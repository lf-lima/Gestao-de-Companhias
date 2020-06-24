import { IsNotEmpty, IsString, Length, IsInt, Min, IsEmail, ValidateNested, ValidationError, validate } from 'class-validator'
import { IsCompanyCnpjAlreadyExist, IsCompanyFullNameAlreadyExist, IsCnpj } from '../../../config/decorators/company'
import { IsUserExist, IsUserEmailAlreadyExist } from '../../../config/decorators/user'
import { Match } from '../../../config/decorators/others'
import InputBase from '../base/input'

export class Company {
  constructor (obj: Partial<Company>) {
    Object.assign(this, obj)
  }

  @IsNotEmpty()
  @IsString()
  @Length(18, 18)
  @IsCnpj()
  @IsCompanyCnpjAlreadyExist()
  cnpj!: string

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  fantasyName!: string

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @IsCompanyFullNameAlreadyExist()
  fullName!: string
}

export class User {
  constructor (obj: Partial<User>) {
    Object.assign(this, obj)
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

export class InputCompanyUserCreate extends InputBase {
  constructor (obj: Partial<InputCompanyUserCreate>) {
    super()
    Object.assign(this, obj)
  }

  @ValidateNested()
  company!: Company

  @ValidateNested()
  user!: User
}
