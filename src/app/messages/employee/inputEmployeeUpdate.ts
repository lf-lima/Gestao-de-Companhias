import { IsOptional, IsString, MinLength, IsInt, IsNotEmpty, Min } from 'class-validator'
import { IsCpf } from '../../../config/decorators/others'
import InputBase from '../base/input'

export class InputEmployeeUpdate extends InputBase {
  constructor (obj: Partial<InputEmployeeUpdate>) {
    super()
    Object.assign(this, obj)
  }

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  employeeId?: number

  @IsOptional()
  @IsString()
  @MinLength(1)
  firstName?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  lastName?: string

  @IsOptional()
  birthday?: Date

  @IsOptional()
  @IsString()
  @IsCpf()
  cpf?: string

  @IsOptional()
  @IsString()
  ctps?: string

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  companyId?: number
}
