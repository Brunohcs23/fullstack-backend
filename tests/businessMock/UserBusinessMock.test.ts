import { UserBusiness } from "../../src/business/UserBusiness";
import idGeneratorMock from "../servicesMock/IdGeneratorMock"
import hashManagerMock from "../servicesMock/HashManagerMock"
import authenticatorMock from "../servicesMock/AuthenticatorMock"
import userDatabaseMock from "../dataMock/UserDatabaseMock"
import { UserDatabase } from "../../src/data/UserDatabase";
import { userMock } from "../modelMock/UserMock";

const userBusiness = new UserBusiness(
    idGeneratorMock,
    hashManagerMock,
    authenticatorMock,
    userDatabaseMock as UserDatabase
)

describe("Signup", () => {

    test("Should return error when 'name', 'email', 'nickname' or 'password' are blank", async () => {
        expect.assertions(2)
        try {

            await userBusiness.signup({
                name: "",
                email: userMock.getEmail(),
                nickname: userMock.getNickname(),
                password: userMock.getPassword()
            })

        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Please check 'name', 'email', 'nickname' and 'password' were filled")
        }
    })

    test("Should return error when 'email' is invalid", async () => {
        expect.assertions(2)
        try {

            await userBusiness.signup({
                name: userMock.getName(),
                email: "useremail.com",
                nickname: userMock.getNickname(),
                password: userMock.getPassword()
            })

        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Sorry, invalid 'email'.")
        }
    })

    test("Should return error when 'nickname' is blank", async () => {
        expect.assertions(2)
        try {

            await userBusiness.signup({
                name: userMock.getName(),
                email: userMock.getEmail(),
                nickname: "",
                password: userMock.getPassword()
            })

        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Please check 'name', 'email', 'nickname' and 'password' were filled")
        }
    })

    test("Should return error when 'password' is invalid", async () => {
        expect.assertions(2)
        try {

            await userBusiness.signup({
                name: userMock.getName(),
                email: userMock.getEmail(),
                nickname: userMock.getNickname(),
                password: "1234"
            })

        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Sorry, your 'password' must be at least 7 characters")
        }
    })
})