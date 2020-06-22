import { Table, Column, BeforeUpdate, BeforeCreate, ForeignKey, BelongsTo } from 'sequelize-typescript'
import BaseModel from './base'
import User from './user'

@Table
export default class Company extends BaseModel<Company> {
  @Column
  cnpj!: string

  @Column
  fantasyName!: string

  @Column
  fullName!: string

  @ForeignKey(() => User)
  @Column
  userId!: number

  @BelongsTo(() => User)
  user?: User

  @BeforeUpdate
  @BeforeCreate
  static async splitCnpj (instance: Company): Promise<void> {
    instance.cnpj = instance.cnpj.replace(/[^\d]+/g, '')
  }

  public async validateCnpj (cnpj: string): Promise<boolean> {
    let response = true
    if (!cnpj) {
      this.addErrors('CNPJ is required')
      return false
    } else {
      cnpj = cnpj.replace(/[^\d]+/g, '')

      if (cnpj.length !== 14) { response = false }

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
            cnpj === '99999999999999') { response = false }

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

      if (resultado !== Number(digitos.charAt(0))) { response = false }

      tamanho = tamanho + 1
      numeros = cnpj.substring(0, tamanho)
      soma = 0
      pos = tamanho - 7
      for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i) * pos--)
        if (pos < 2) { pos = 9 }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
      if (resultado !== Number(digitos.charAt(1))) { response = false }
    }

    if (!response) {
      await this.addErrors('CNPJ is invalid')
      return false
    }

    return true
  }

  public async validateFantasyName (fantasyName: string): Promise<boolean> {
    if (!fantasyName) {
      await this.addErrors('Fantasy Name is required')
    } else {
      if (fantasyName.length > 255) {
        await this.addErrors('Fantasy Name is too long')
      }
    }

    if (this.hasError) return false

    return true
  }

  public async validateFullName (fullName: string): Promise<boolean> {
    if (!fullName) {
      await this.addErrors('Full Name is required')
    } else {
      if (fullName.length > 255) {
        await this.addErrors('Full Name is too long')
      }
    }

    if (this.hasError) return false

    return true
  }
}
