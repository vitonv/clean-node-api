import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http-helpers'
import { AuthMiddleware } from './auth-middleware'
 
const makeSut = () => {
  const sut = new AuthMiddleware()
  return {
    sut
  }
}
describe('Auth Middleware', () => {
  it('Should return 403 if no x-acess-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
