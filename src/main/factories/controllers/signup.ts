import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../../decorators/log'
import { makeAddAccount } from '../services/signup'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const logMongoRepository = new LogMongoRepository()
  const signUpController = new SignUpController(emailValidator, makeAddAccount(), makeSignUpValidation())
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
