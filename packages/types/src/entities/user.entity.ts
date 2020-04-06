export  class User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    tgContact?: string;
    password: string;
    private hashUserPassword;
}
