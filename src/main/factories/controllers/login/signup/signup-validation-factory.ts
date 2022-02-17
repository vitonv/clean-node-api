import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  Validation,
  ValidationComposite
} from '../../../../../validation/validators'
import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const emailValidator = new EmailValidatorAdapter()
  validations.push(new RequiredFieldValidation('name'))
  validations.push(new RequiredFieldValidation('email'))
  validations.push(new RequiredFieldValidation('password'))
  validations.push(new RequiredFieldValidation('passwordConfirmation'))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
