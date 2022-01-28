import {
  CompareFieldsValidation,
  RequiredFieldValidation,
  Validation,
  ValidationComposite
} from '../../../presentation/helpers/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('name'))
  validations.push(new RequiredFieldValidation('email'))
  validations.push(new RequiredFieldValidation('password'))
  validations.push(new RequiredFieldValidation('passwordConfirmation'))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
