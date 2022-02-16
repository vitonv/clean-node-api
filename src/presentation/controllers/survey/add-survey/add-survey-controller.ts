import { Controller, HttpRequest, HttpResponse, serverError, Validation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
