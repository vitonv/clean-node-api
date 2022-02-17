import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogController } from '../../decorators/log-controller-decorator-factory'
import { makeAddSurvey } from '../../usecases/survey/add-survey'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeAddSurvey())
  return makeLogController(addSurveyController)
}
