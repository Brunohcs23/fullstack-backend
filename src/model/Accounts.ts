export class Accounts {
    constructor(
        private id: string,
        private email: string,
        private nickname: string,
        private password: string,
        private userId: string 
    ){}

    public getId(): string {
        return this.id;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getEmail(): string {
        return this.email;
    }

    public getNickname(): string {
        return this.nickname;
    }

    public getPassword(): string {
        return this.password;
    }
}

export interface LoginInputDTO {
    email: string;
    password: string;
}
