import { TagsDTO } from "../../src/model/Media";

export class ImageDatabaseMock{

    
    public async createImage(
        id: string,
        subtitle: string,
        author: string,
        date: Date,
        file: string,
        collection: string
    ): Promise<void> {
        
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
        
    // }

    // public async getImageById(id: string): Promise<Image | undefined> {
        
    // }
}

export default new ImageDatabaseMock()