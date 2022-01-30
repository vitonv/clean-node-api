import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'

export const makeAuthentication = (): DbAuthentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter()
  const bcryptAdapter = new BcryptAdapter(12)
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
