export class Users {
    constructor(
        private id: string,
        private name: string,
        private gender: string,
        private birthDate: Date,
        private email: string,
        private nickname: string       
    ) { }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getGender(): string {
        return this.gender;
    }

    public getBirthDate(): Date {
        return this.birthDate;
    }
    public getEmail(): string {
        return this.email;
    }

    public getNickname(): string {
        return this.nickname;
    }
}

export interface SignupInputDTO {
    name: string;
    gender: string;
    birthDate: Date;
    email: string;
    nickname: string;
    password: string;
}

