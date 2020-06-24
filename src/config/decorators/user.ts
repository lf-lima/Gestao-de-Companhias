/* eslint-disable @typescript-eslint/ban-types */
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'
import userService from '../../service/user'

@ValidatorConstraint({ async: true })
export class IsUserEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  validate (email: string, args: ValidationArguments): Promise<boolean> {
    const res = userService.findByEmail(email).then(user => {
      if (!user.hasError) return false
      return true
    })
    return res
  }

  defaultMessage (args: ValidationArguments): string {
    return 'Email already exist'
  }
}

export function IsUserEmailAlreadyExist (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserEmailAlreadyExistConstraint
    })
  }
}

@ValidatorConstraint({ async: true })
export class IsUserExistConstraint implements ValidatorConstraintInterface {
  validate (userId: number, args: ValidationArguments): Promise<boolean> {
    const res = userService.findById(userId).then(user => {
      if (user.hasError) return false
      return true
    })
    return res
  }

  defaultMessage (args: ValidationArguments): string {
    return 'User not exist'
  }
}

export function IsUserExist (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistConstraint
    })
  }
}
