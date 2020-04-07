import { User } from './user.entity';
export  class Session {
    id: string;
    user: User;
    userId: number;
    refreshToken: string;
    fingerprint: string;
    ip: string;
    expires: number;
    createdAt: Date;
    private setCreatedAt;
}
