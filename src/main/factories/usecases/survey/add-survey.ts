import { DbAddSurvey } from '../../../../data/usecases/add-survey/db-add-survey'
import { AddSurvey } from '../../../../domain/usecases/survey/add-survey'
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const makeAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
