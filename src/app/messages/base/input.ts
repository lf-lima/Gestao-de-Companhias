import { ValidationError, validate } from 'class-validator'

export default class InputBase {
  public hasError = false

  public async validate (): Promise<ValidationError[]> {
    const errors = await validate(this, {
      validationError: {
        target: false,
        value: false
      }
    }).then(errors => errors)

    if (errors.length) {
      this.hasError = true
    }

    return errors
  }
}
