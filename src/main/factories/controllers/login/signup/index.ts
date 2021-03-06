import { SignUpController } from '../../../../../presentation/controllers/login/signup/signup-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogController } from '../../../decorators/log-controller-decorator-factory'
import { makeAuthentication } from '../../../usecases/account/authentication'
import { makeAddAccount } from '../../../usecases/account/signup'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeAddAccount(), makeSignUpValidation(), makeAuthentication())
  return makeLogController(signUpController)
}
