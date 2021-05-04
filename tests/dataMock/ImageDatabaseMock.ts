import { DbImageInputDTO } from "../../src/model/Images";
import { DbTagDTO} from "../../src/model/Tags";

export class ImageDatabaseMock {

    public async createImage(image: DbImageInputDTO): Promise<void> {

    }

    public async findTag(text: string): Promise<DbTagDTO | undefined> {

        if (text === "teste") {
            return undefined
        }
        return {
            id: "id",
            name: "imageName"
        }
    }

    public async createTag(tag: DbTagDTO): Promise<void> {

    }

    public async addImageTag(imageId: string, tagId: string): Promise<void> {

    }
}

export default new ImageDatabaseMock()