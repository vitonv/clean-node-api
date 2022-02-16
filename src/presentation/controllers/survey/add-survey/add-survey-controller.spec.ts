
import { AddSurvey, badRequest, HttpRequest, noContent, serverError, Validation } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'


const makeValidation = ():Validation => {
    class ValidationStub implements Validation{
     validate (input: any): Error{
         return null
     }
    }
    return new ValidationStub()
}
const makeAddSurvey = (): AddSurvey => {
    class AddSurveyStub implements AddSurvey{
        async add (data: AddSurveyModel):Promise<void>{
            return Promise.resolve(null)
        }
    }
    return new AddSurveyStub()
}

type SutTypes = {
    sut: AddSurveyController
    validationStub: Validation
    addSurveyStub: AddSurvey
}
const makeSut = ():SutTypes => {
    const validationStub = makeValidation()
    const addSurveyStub = makeAddSurvey()
    const sut = new AddSurveyController(validationStub,addSurveyStub);

    return {
        sut,
        validationStub,
        addSurveyStub
    }
}
const makeFakeRequest = ():HttpRequest => ({
    body:{
        question:'any_question',
        answers:[{
            image:'any_image',
            answer:'any_answer'
        }]
    }
})
describe('AddSurvey Controller', () => {
  it('Should call validation with correct values', async() => {
    const { sut,validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub,'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  it('Should call validation with correct values', async() => {
    const { sut,validationStub } = makeSut()
    jest.spyOn(validationStub,'validate').mockReturnValueOnce(new Error())
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  it('Should call AddSurvey with correct values', async() => {
    const { sut,addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub,'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  it('Should return 500 if AddSurvey throws', async() => {
    const { sut,addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub,'add').mockRejectedValueOnce(new Error())
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  it('Should return 204 on success', async() => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })
})
