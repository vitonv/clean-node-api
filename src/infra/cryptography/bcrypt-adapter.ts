import { hash } from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export class BcryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {}
  async encrypt (value: string): Promise<string> {
    await hash(value, this.salt)
    return null
  }
}
