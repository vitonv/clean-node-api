
import { HttpRequest, Validation } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'


const makeValidation = ():Validation => {
    class ValidationStub implements Validation{
     validate (input: any): Error{
         return null
     }
    }
    return new ValidationStub()
}
const makeSut = () => {
    const validationStub = makeValidation()
    const sut = new AddSurveyController(validationStub);

    return {
        sut,
        validationStub
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
})
