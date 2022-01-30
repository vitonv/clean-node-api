import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

const makeSut = (): JwtAdapter => {
  const sut = new JwtAdapter('secret')
  return sut
}
describe('Jwt Adapter', () => {
  describe('sign()', () => {
    it('should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })
  })
})
