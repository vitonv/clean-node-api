import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeAuthentication } from '../../services/authentication'
import { makeAddAccount } from '../../services/signup'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const logMongoRepository = new LogMongoRepository()
  const signUpController = new SignUpController(makeAddAccount(), makeSignUpValidation(), makeAuthentication())
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
