import { Controller, AddAccount, HttpRequest, HttpResponse, Validation, Authentication } from './sign-up-protocols'
import { badRequest, serverError, ok, forbidden } from '../../../helpers/http-helpers'
import { EmailInUseError } from '../../../errors'

class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (account) {
        const accessToken = await this.authentication.auth({
          email, password
        })
        return ok({ accessToken })
      }
      return forbidden(new EmailInUseError())
    } catch (error) {
      return serverError(error)
    }
  }
}
export { SignUpController }
