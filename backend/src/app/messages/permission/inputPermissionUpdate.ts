import InputBase from '../base/input'
import { IsString, IsOptional, MinLength, IsInt, Min } from 'class-validator'

export class InputPermissionUpdate extends InputBase {
  constructor (obj: Partial<InputPermissionUpdate>) {
    super()
    Object.assign(this, obj)
  }

  @IsOptional()
  @IsInt()
  @Min(1)
  permissionId?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string
}
