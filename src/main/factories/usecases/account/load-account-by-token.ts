
import { DbLoadAccountByToken } from '../../../../data/usecases/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '../../../../infra/cryptography/jwt/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { LoadAccountByToken } from '../../../../presentation/middlewares/auth-middleware-protocols'
import env from '../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountRepository)
}
