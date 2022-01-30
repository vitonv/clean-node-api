import bcrypt from 'bcrypt'
import { HashComparer, Hasher } from '../../data/protocols/cryptography'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async compare (value: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(value, hash)
    return result
  }

  async hash (value: string): Promise<string> {
    const hashed = await bcrypt.hash(value, this.salt)
    return hashed
  }
}
