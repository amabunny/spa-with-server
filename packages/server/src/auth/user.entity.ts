import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
  static hashPassword (password: string) {
    const saltEdges = 10
    return bcrypt.hashSync(password, saltEdges)
  }

  static comparePasswords (password: string, encrypted: string) {
    return bcrypt.compareSync(password, encrypted)
  }

  @PrimaryGeneratedColumn()
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  username: string

  @Column({ nullable: true })
  tgContact?: string

  @Column()
  password: string

  @BeforeInsert()
  private hashUserPassword () {
    this.password = User.hashPassword(this.password)
  }
}
