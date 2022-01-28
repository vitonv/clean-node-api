import { Authentication } from '../../../domain/usecases/authentication'
import { unauthorized } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    const token = await this.authentication.auth(email, password)
    if (!token) {
      return unauthorized()
    }
    return null
  }
}
