import { IsNotEmpty, IsString, Length } from 'class-validator'
import { InputUserCreate } from '../user/input'

export class InputCompanyCreate extends InputUserCreate {
  constructor (
    userData: {
      email: string, password: string, confirmPassword: string,
  }, {
      cnpj, fantasyName, fullName
    }: {
    cnpj: string, fantasyName: string, fullName: string
  }) {
    super(userData)
    this.cnpj = cnpj
    this.fantasyName = fantasyName
    this.fullName = fullName
  }

  @IsNotEmpty()
  @IsString()
  @Length(18)
  cnpj!: string

  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  fantasyName!: string

  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  fullName!: string
}
