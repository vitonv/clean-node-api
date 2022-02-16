import { AddSurvey, AddSurveyModel } from '../../../domain/usecases/add-survey'
import { DbAddSurvey } from './db-add-survey'
import { AddSurveyRepository } from './db-add-survey-protocols'
const makeAddSurveyRepository = () => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyModel): Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new AddSurveyRepositoryStub()
  }
interface SutTypes {
  sut: AddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}
const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}
const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})
describe('DbAddSurvey UseCase', () => {
  it('Should call AddSurveyRepository with correct values', async () => {
    const { sut,addSurveyRepositoryStub} = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub,'add')
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
  it('Should throw if AddSurveyRepository throws', async () => {
    const { sut,addSurveyRepositoryStub} = makeSut()
    jest.spyOn(addSurveyRepositoryStub,'add').mockRejectedValueOnce(new Error())
    const surveyData = makeFakeSurveyData()
    const error =  sut.add(surveyData)
    await expect(error).rejects.toThrow()
  })
})
