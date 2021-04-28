import { Media, TagsDTO } from "../model/Media";
import { BaseDatabase } from "./BaseDatabase";

export class ImageDatabase extends BaseDatabase {

    private TABLE_IMAGE: string = "tabela criada para as imagens"
    private TABLE_TAGS: string = "tabela criada para as tags"
    private TABLE_IMAGES_TAGS: string = "tabela combinada para as imagens e as tags"

    public async createImage(image: Media): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: image.getId(),
                    subtitle: image.getSubtitle(),
                    author: image.getAuthor(),
                    date: image.getDate(),
                    file: image.getFile(),
                    collection: image.getCollection()
                })
                .into(this.TABLE_IMAGE)

            for (let tag of image.getTags()) {

                const results: TagsDTO[] = await this.getConnection()
                    .from(this.TABLE_TAGS)

                for (let result of results) {

                    if (result.name === tag) {
                        await this.getConnection()
                            .insert({
                                image_id: image.getId(),
                                tag_id: result.id
                            })
                            .into(this.TABLE_IMAGES_TAGS)

                    } else {
                        
                        await this.getConnection()
                            .insert({
                                name: tag
                            })
                            .into(this.TABLE_TAGS)
                    }
                }

            }

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async getAllImages(): Promise<Media[] | undefined> {
        try {
            const result = await this.getConnection()
                .from(this.TABLE_IMAGE)

            return result

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async getImageById(id: string): Promise<Media | undefined> {
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