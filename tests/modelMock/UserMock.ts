import { SignupInputDTO, Users } from "../../src/model/Users";

export const signupTest: SignupInputDTO = {
    name: "AstroDev",
    gender: "male",
    birthDate: new Date(),
    email: "astrodev@dev.com",
    nickname: "AstroDev",
    password: "12345678"
}

export const userTest = new Users(
    "userId",
    "userName",
    "userGender",
    new Date(),
    "user@test.com",
    "userNikname"
)