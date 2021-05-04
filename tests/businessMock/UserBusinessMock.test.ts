import { UserBusiness } from "../../src/business/UserBusiness";
import { UserDatabase } from "../../src/data/UserDatabase";

import idGenerator from "../servicesMock/IdGeneratorMock";
import hashManager from "../servicesMock/HashManagerMock";
import authenticator from "../servicesMock/AuthenticatorMock";
import userDatabaseMock from "../dataMock/UserDatabaseMock";
import { signupTest } from "../modelMock/UserMock";

const userBusiness = new UserBusiness(
    idGenerator,
    hashManager,
    authenticator,
    userDatabaseMock as UserDatabase
)

describe("Signup", () => {

    test('should return error when inputs are missing', async () => {
        expect.assertions(2)
        try {
            await userBusiness.signup({ ...signupTest, name: "" })

        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Please check 'name', 'email', 'nickname' and 'password' were filled")
        }
    })

    test("should return error when 'email' is invalid", async () => {
        expect.assertions(2)
        try {
            await userBusiness.signup({ ...signupTest, email: "invalidEmail.com" })

        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Sorry, invalid 'email'.")
        }
    })

    test("should return error when 'password' is invalid", async () => {
        expect.assertions(2)
        try {
            await userBusiness.signup({ ...signupTest, password: "123" })

        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Sorry, your 'password' must be at least 7 characters")
        }
    })

    test("should return success when all fields are valid", async () => {
        expect.assertions(1)
        try {
            const accessToken = await userBusiness.signup({ ...signupTest })

            expect(accessToken).toBe("bananinha")

        } catch (error) {

        }
    })

})