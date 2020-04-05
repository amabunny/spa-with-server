import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm'
import { Crypt } from '@app/auth/crypt'

@Entity()
export class User {
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
    this.password = Crypt.hashPassword(this.password)
  }
}
