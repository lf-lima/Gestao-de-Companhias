import InputBase from '../base/input'
import { IsString, IsOptional, MinLength, IsInt, Min } from 'class-validator'

export class InputProfileUpdate extends InputBase {
  constructor (obj: Partial<InputProfileUpdate>) {
    super()
    Object.assign(this, obj)
  }

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string

  @IsOptional()
  @IsInt()
  @Min(1)
  profileId?: string
}
