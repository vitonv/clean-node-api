import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeAddAccount } from '../services/signup'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const logMongoRepository = new LogMongoRepository()
  const signUpController = new SignUpController(makeAddAccount(), makeSignUpValidation())
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
