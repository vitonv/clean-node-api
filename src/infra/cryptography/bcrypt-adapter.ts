import { hash } from 'bcrypt'
import { Hasher } from '../../data/protocols/cryptography'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    const hashed = await hash(value, this.salt)
    return hashed
  }
}
