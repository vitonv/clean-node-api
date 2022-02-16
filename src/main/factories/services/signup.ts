import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { AddAccount } from '../../../domain/usecases/add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'

export const makeAddAccount = (): AddAccount => {
  const bcryptAdapter = new BcryptAdapter(12)
  const accountRepository = new AccountMongoRepository()
  return new DbAddAccount(accountRepository, bcryptAdapter, accountRepository)
}
