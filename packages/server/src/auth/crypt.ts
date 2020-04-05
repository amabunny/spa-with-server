import * as bcrypt from 'bcrypt'

export class Crypt {
  static saltEdges = 10

  static hashPassword (password: string) {
    return bcrypt.hashSync(password, Crypt.saltEdges)
  }

  static comparePasswords (password: string, encrypted: string) {
    return bcrypt.compareSync(password, encrypted)
  }
}
