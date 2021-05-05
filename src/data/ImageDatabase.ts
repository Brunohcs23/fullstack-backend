import { allImagesDTO, Images } from "../model/Images";
import { Tags } from "../model/Tags";
import { BaseDatabase } from "./BaseDatabase";

export class ImageDatabase extends BaseDatabase {

    private TABLE_IMAGES = process.env.DB_TABLE_IMAGES
    private TABLE_TAGS = process.env.DB_TABLE_TAGS
    private TABLE_IMAGES_TAGS = process.env.DB_TABLE_IMAGES_TAGS

    private toTagModel(dbTagModel?: any): Tags | undefined {
        return (dbTagModel &&
            new Tags(
                dbTagModel.id,
                dbTagModel.name
            )
        )
    };

    private toImageModel(dbModel?: any): Images | undefined {
        return (dbModel &&
            new Images(
                dbModel.image_id,
                dbModel.subtitle,
                dbModel.author,
                dbModel.file,
                dbModel.collection,
                dbModel.account_id
            ))
    };

    public async createImage(image: Images): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: image.getId(),
                    subtitle: image.getSubtitle(),
                    author: image.getAuthor(),
                    file: image.getFile(),
                    collection: image.getCollection(),
                    account_id: image.getAccountId()
                })
                .into(this.TABLE_IMAGES!)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }    

    public async findTag(text: string): Promise<Tags | undefined> {
        try {
            const [result] = await this.getConnection()
                .select("*")
                .from(this.TABLE_TAGS!)
                .where({ name: text })

            return this.toTagModel(result)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async createTag(tag: Tags): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: tag.getId(),
                    name: tag.getName()
                })
                .into(this.TABLE_TAGS!)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async addImageTag(imageId: string, tagId: string): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    image_id: imageId,
                    tag_id: tagId
                })
                .into(this.TABLE_IMAGES_TAGS!)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async getAllImages(): Promise<allImagesDTO[] | undefined> {
        try {
            const result = await this.getConnection()
                .select("id", "file", "author")
                .from(this.TABLE_IMAGES)

            return result

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async getImageDetails(id: string): Promise<Images | undefined> {
        try {

            const [image] = await this.getConnection()
                .select("*")
                .from(this.TABLE_IMAGES)
                .where({ id: id })

            return this.toImageModel(image)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async getImageTags(id: string): Promise<any> {

        try {

            const tags = await this.getConnection().raw(`
                SELECT name
                FROM IMG_MANAGER_IMAGES_TAGS
                JOIN IMG_MANAGER_IMAGES as images
                ON IMG_MANAGER_IMAGES_TAGS.image_id = images.id
                JOIN IMG_MANAGER_TAGS as tags
                ON IMG_MANAGER_IMAGES_TAGS.tag_id = tags.id
                WHERE images.id = '${id}'    
            `)

            return tags[0]

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }    
}

export default new ImageDatabase()