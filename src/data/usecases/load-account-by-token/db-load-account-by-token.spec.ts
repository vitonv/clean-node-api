import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decrypter, LoadAccountByToken } from './db-load-account-by-token-protocols'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}
interface SutTypes {
  sut: LoadAccountByToken
  decrypterStub: Decrypter
}
const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}
describe('DbLoadAccountByToken UseCase', () => {
  it('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
