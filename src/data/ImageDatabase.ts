import { Images } from "../model/Images";
import { DbTagDTO, Tags } from "../model/Tags";
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

}