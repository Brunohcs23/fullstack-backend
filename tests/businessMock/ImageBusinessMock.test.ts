import { ImageBusiness } from "../../src/business/ImageBusiness";
import { ImageDatabase } from "../../src/data/ImageDatabase"
import { UserDatabase } from "../../src/data/UserDatabase"

import idGenerator from "../servicesMock/IdGeneratorMock";
import authenticator from "../servicesMock/AuthenticatorMock"
import imageDatabaseMock from "../dataMock/ImageDatabaseMock"
import userDatabaseMock from "../dataMock/UserDatabaseMock"

import { imageTest } from "../modelMock/ImageMock";

const imageBusiness = new ImageBusiness(
    idGenerator,
    authenticator,
    imageDatabaseMock as ImageDatabase,
    userDatabaseMock as UserDatabase
)

describe("Create Image", () => { 

    test("should return error when 'token' is blank" , async () => {
        expect.assertions(2)
        try {
            await imageBusiness.createImage("", {...imageTest})
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Sorry!You must be 'login' first")
        }        
    })

    test("should return error when 'subtitle', 'author', 'file' or 'collection' are blank" , async () => {
        expect.assertions(2)
        try {
            await imageBusiness.createImage("token", {...imageTest, author: ""})

        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Please check 'subtitle', 'author', 'file' and 'collection' were filled")
        }        
    })
    
})