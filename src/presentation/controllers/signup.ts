import { MissingParamError, InvalidParamError } from '../errors/'
import { badRequest, serverError } from '../helpers/http-helpers'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFiels = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFiels) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
export { SignUpController }
