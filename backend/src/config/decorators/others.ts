/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'

@ValidatorConstraint({ async: true })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate (value: any, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints
    const relatedValue = (args.object as any)[relatedPropertyName]
    return value === relatedValue
  }
}

export function Match (property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint
    })
  }
}

@ValidatorConstraint({ async: true })
export class IsCnpjConstraint implements ValidatorConstraintInterface {
  validate (cnpj: string, args: ValidationArguments): boolean {
    if (!cnpj) {
      return false
    } else {
      cnpj = cnpj.replace(/[^\d]+/g, '')

      if (cnpj.length !== 14) { return false }

      // Elimina CNPJs invalidos conhecidos
      if (cnpj === '00000000000000' ||
            cnpj === '11111111111111' ||
            cnpj === '22222222222222' ||
            cnpj === '33333333333333' ||
            cnpj === '44444444444444' ||
            cnpj === '55555555555555' ||
            cnpj === '66666666666666' ||
            cnpj === '77777777777777' ||
            cnpj === '88888888888888' ||
            cnpj === '99999999999999') { return false }

      // Valida DVs
      let tamanho = cnpj.length - 2
      let numeros: any = cnpj.substring(0, tamanho)
      const digitos: any = cnpj.substring(tamanho)
      let soma = 0
      let pos = tamanho - 7
      for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i) * pos--)
        if (pos < 2) { pos = 9 }
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11

      if (resultado !== Number(digitos.charAt(0))) { return false }

      tamanho = tamanho + 1
      numeros = cnpj.substring(0, tamanho)
      soma = 0
      pos = tamanho - 7
      for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i) * pos--)
        if (pos < 2) { pos = 9 }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
      if (resultado !== Number(digitos.charAt(1))) { return false }
    }

    return true
  }

  defaultMessage (args: ValidationArguments): string {
    return 'Cnpj is invalid'
  }
}

export function IsCnpj (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCnpjConstraint
    })
  }
}

@ValidatorConstraint({ async: true })
export class IsCpfConstraint implements ValidatorConstraintInterface {
  validate (cpf: string, args: ValidationArguments): boolean {
    if (!cpf) {
      return false
    } else {
      cpf = cpf.replace(/[^\d]+/g, '')
      let soma
      let resto
      soma = 0
      if (cpf === '00000000000') return false

      for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
      resto = (soma * 10) % 11

      if ((resto === 10) || (resto === 11)) resto = 0
      if (resto !== parseInt(cpf.substring(9, 10))) return false

      soma = 0
      for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
      resto = (soma * 10) % 11

      if ((resto === 10) || (resto === 11)) resto = 0
      if (resto !== parseInt(cpf.substring(10, 11))) return false
    }

    return true
  }

  defaultMessage (args: ValidationArguments): string {
    return 'Cpf is invalid'
  }
}

export function IsCpf (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfConstraint
    })
  }
}
