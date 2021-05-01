import { ImageBusiness } from "../../src/business/ImageBusiness";
import idGeneratorMock from "../servicesMock/IdGeneratorMock";
import authenticatorMock from "../servicesMock/AuthenticatorMock";
import imageDatabaseMock from "../dataMock/ImageDatabaseMock";
import { ImageDatabase } from "../../src/data/ImageDatabase"


const imageBusiness = new ImageBusiness(
    idGeneratorMock,
    authenticatorMock,
    imageDatabaseMock as ImageDatabase
)

describe("Token", () => { 
    test("Should return error when 'token' is invalid", async () => {
        expect.assertions(2)

        try {
            await imageBusiness.createImage("invalid", {
                subtitle: "texto",
                author: "Bruno",
                file: "link da imagem",
                tags: ["tag1", "tag2"],
                collection: "Festas"

            })

        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Sorry! User not found")
        }
    })
    
})

describe("Create Image", () => {


    test("Should return error when 'subtitle', 'author', 'file' or 'collection' are blank", async () => {
        expect.assertions(2)

        try {
            await imageBusiness.createImage("token", {
                subtitle: "texto",
                author: "",
                file: "link da imagem",
                tags: ["tag1", "tag2", "tag3"],
                collection: "Festas"
            })

        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Please check 'subtitle', 'author', 'file' and 'collection' were filled")

        }
    })

    test("Should return error when 'tags' is blank", async () => {
        expect.assertions(2)

        try {
            await imageBusiness.createImage("token", {
                subtitle: "texto",
                author: "Bruno",
                file: "link da imagem",
                tags: [],
                collection: "Festas"

            })

        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Please provide at least 1 'tag'!")

        }
    })

    test("Should return success", async () => {

        try {
            await imageBusiness.createImage("token", {
                subtitle: "texto",
                author: "Bruno",
                file: "link da imagem",
                tags: ["tag1", "tag2"],
                collection: "Festas"
            })

        } catch (error) {

        }
    })

})