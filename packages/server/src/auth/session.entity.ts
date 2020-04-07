import { Entity, PrimaryGeneratedColumn, ManyToOne, Generated, Column, BeforeInsert } from 'typeorm'
import { User } from '@app/users/user.entity'

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => User, user => user.sessions)
  user: User

  @Generated('uuid')
  refreshToken: string

  @Column()
  fingerprint: string

  @Column({ type: 'varchar', length: 15 })
  ip: string

  @Column({ type: 'bigint' })
  expires: number

  @Column()
  createdAt: Date

  @BeforeInsert()
  private setCreatedAt () {
    this.createdAt = new Date()
  }
}
