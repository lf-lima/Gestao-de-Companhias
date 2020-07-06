import { IsString, Length, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator'
import { IsCnpj } from '../../../config/decorators/others'
import InputBase from '../base/input'

export class InputCompanyUpdate extends InputBase {
  constructor (obj: Partial<InputCompanyUpdate>) {
    super()
    Object.assign(this, obj)
  }

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  companyId!: number

  @IsOptional()
  @IsString()
  @Length(18, 18)
  @IsCnpj()
  cnpj?: string

  @IsOptional()
  @IsString()
  @Length(1, 255)
  fantasyName?: string

  @IsOptional()
  @IsString()
  @Length(1, 255)
  fullName?: string
}
