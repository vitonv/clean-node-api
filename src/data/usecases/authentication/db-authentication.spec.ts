import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/cryptography'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

interface SutTypes{
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
}
const makeLoadAccountByEmail = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return await Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email,
        password: 'hashed_password'
      })
    }
  }
  return new LoadAccountByEmailRepositorySpy()
}
const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HashComparerStub()
}
const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmail()
  const hashComparerStub = makeHashComparer()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub
  }
}
const makeFakeAuth = (): AuthenticationModel => ({
  email: 'any_mail@mail.com',
  password: 'any_password'
})
describe('DbAuthentication UseCase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuth())
    expect(loadSpy).toHaveBeenCalledWith(makeFakeAuth().email)
  })
  it('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockRejectedValueOnce(new Error())
    const error = sut.auth(makeFakeAuth())
    await expect(error).rejects.toThrow()
  })
  it('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockResolvedValueOnce(null)
    const accessToken = await sut.auth(makeFakeAuth())
    expect(accessToken).toBeNull()
  })
  it('Should call HashComparer with correct password', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAuth())
    expect(compareSpy).toHaveBeenCalledWith(makeFakeAuth().password, 'hashed_password')
  })
})
