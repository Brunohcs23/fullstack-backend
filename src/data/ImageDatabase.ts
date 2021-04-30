import { Image, TagsDTO } from "../model/Media";
import { BaseDatabase } from "./BaseDatabase";

export class ImageDatabase extends BaseDatabase {

    private TABLE_IMAGE: string = "tabela criada para as imagens"
    private TABLE_TAGS: string = "tabela criada para as tags"
    private TABLE_IMAGES_TAGS: string = "tabela combinada para as imagens e as tags"

    public async createImage(
        id: string,
        subtitle: string,
        author: string,
        date: Date,
        file: string,
        collection: string
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    subtitle,
                    author,
                    date,
                    file,
                    collection
                })
                .into(this.TABLE_IMAGE)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async findTag(text: string): Promise<TagsDTO | undefined> {
        try {

            const [tag] = await this.getConnection()
                .select("*")
                .from(this.TABLE_TAGS)
                .where({ name: text })
            return tag

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async createTag(tag: TagsDTO): Promise<void> {
        try {
            await this.getConnection().
                insert({
                    id: tag.id,
                    name: tag.name
                })
                .into(this.TABLE_TAGS)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async addImageTags(imageId: string, tagId: string): Promise<void> {

        try {
            await this.getConnection()
                .insert({
                    image_id: imageId,
                    tag_id: tagId
                })
                .into(this.TABLE_IMAGES_TAGS)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async getAllImages(): Promise<Image[] | undefined> {
        try {
            const result = await this.getConnection()
                .select("*")
                .from(this.TABLE_IMAGE)

            return result

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async getImageById(id: string): Promise<Image | undefined> {
        try {
            const result = await this.getConnection()
                .from(this.TABLE_IMAGE)
                .where({ id })

            return result[0]

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }
}

export default new ImageDatabase()