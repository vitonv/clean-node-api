import { LoginController } from '../../../../presentation/controllers/login/login/login-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogController } from '../../decorators/log-controller-decorator-factory'
import { makeAuthentication } from '../../services/authentication'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeLoginValidation(), makeAuthentication())
  return makeLogController(loginController)
}
