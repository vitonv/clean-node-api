import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { makeAuthentication } from '../services/authentication'

export const makeAuthenticationController = () => {
  return new LoginController(makeAuthentication())
}
