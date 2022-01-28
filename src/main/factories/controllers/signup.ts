import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { makeAddAccount } from '../services/signup'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  return new SignUpController(emailValidator, makeAddAccount())
}
