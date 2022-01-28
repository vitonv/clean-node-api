import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../../decorators/log'
import { makeAddAccount } from '../services/signup'

export const makeSignUpController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const signUpController = new SignUpController(emailValidator, makeAddAccount())
  return new LogControllerDecorator(signUpController)
}
