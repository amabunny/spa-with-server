import { Entity, PrimaryGeneratedColumn, ManyToOne, Generated, Column, BeforeInsert, JoinColumn } from 'typeorm'
import { User } from '@app/users/user.entity'

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => User, user => user.sessions)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user?: User

  @Column()
  userId: number

  @Column()
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
