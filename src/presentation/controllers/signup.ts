import { HttpRequest, HttpResponse } from '../protocols/http'

class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    }
  }
}

export { SignUpController }
