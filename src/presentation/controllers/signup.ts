import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest } from '../helpers/http-helpers'
class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    const requiredFiels = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFiels) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
export { SignUpController }
