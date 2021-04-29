import { ImageBusiness } from "../../src/business/ImageBusiness";
import idGeneratorMock from "../servicesMock/IdGeneratorMock";
import imageDatabaseMock from "../dataMock/ImageDatabaseMock";
import { ImageDatabase } from "../../src/data/ImageDatabase"


const imageBusiness = new ImageBusiness(
    idGeneratorMock,
    imageDatabaseMock as ImageDatabase
)

describe("Create Image", () => {

    test("Should return error when 'subtitle', 'author', 'file' or 'collection' are blank", async () => {
        
    })

})