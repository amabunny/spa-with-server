import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm'
import { Crypt } from '@app/auth/crypt'
import { Session } from '@app/auth/session.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

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

  @OneToMany(() => Session, session => session.user)
  sessions?: Session[]

  @BeforeInsert()
  private hashUserPassword () {
    this.password = Crypt.hashPassword(this.password)
  }
}
