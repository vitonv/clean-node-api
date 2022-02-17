
import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator-adapter'
import { Validation, CompareFieldsValidation, ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../../../validation/validators'
import { makeSignUpValidation } from './signup-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')
describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validatoins', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
