import { Image, TagsDTO } from "../../src/model/Media";

export class ImageDatabaseMock {

    public async createImage(image: Image): Promise<void> {

    }

    public async findTag(text: string): Promise<TagsDTO | undefined> {
        return {
            id: "id",
            name: text
        }
    }

    public async createTag(tag: TagsDTO): Promise<void> {

    }

    public async addImageTags(imageId: string, tagId: string): Promise<void> {

    }

    // public async getAllImages(): Promise<Image[] | undefined> {
    //     try {
    //         const result = await this.getConnection()
    //             .select("*")
    //             .from(this.TABLE_IMAGE)

    //         return result

    //     } catch (error) {
    //         throw new Error(error.sqlmessage || error.message);
    //     }
    // }

    // public async getImageById(id: string): Promise<Image | undefined> {
    //     try {
    //         const result = await this.getConnection()
    //             .from(this.TABLE_IMAGE)
    //             .where({ id })

    //         return result[0]

    //     } catch (error) {
    //         throw new Error(error.sqlmessage || error.message);
    //     }
    // }
}

export default new ImageDatabaseMock()