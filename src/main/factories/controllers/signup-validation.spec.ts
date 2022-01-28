import { CompareFieldsValidation, Validation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'

import { makeSignUpValidation } from './signup-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')
describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validatoins', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
