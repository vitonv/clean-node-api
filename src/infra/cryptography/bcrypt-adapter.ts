import { hash } from 'bcrypt'
import { Encrypter } from '../../data/protocols/cryptography'

export class BcryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {}
  async encrypt (value: string): Promise<string> {
    const hashed = await hash(value, this.salt)
    return hashed
  }
}
