import { Session } from './session.entity';
export  class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    tgContact?: string;
    password: string;
    sessions?: Session[];
    private hashUserPassword;
}
