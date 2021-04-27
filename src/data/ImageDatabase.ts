import { Media } from "../model/Media";
import { BaseDatabase } from "./BaseDatabase";

export class ImageDatabase extends BaseDatabase {

    private TABLE_NAME: string = "tabela criada para as imagens"

    public async createImage(image: Media): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: image.getId(),
                    subtitle: image.getSubtitle(),
                    author: image.getAuthor(),
                    date: image.getDate(),
                    file: image.getFile(),
                    tags: image.getTags(),
                    collection: image.getCollection()
                })
                .into(this.TABLE_NAME)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async getAllImages(): Promise<Media[] | undefined> {
        try {
            const result = await this.getConnection()
                .from(this.TABLE_NAME)

            return result

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async getImageById(id: string): Promise<Media | undefined> {
        try {
            const result = await this.getConnection()
                .from(this.TABLE_NAME)
                .where({ id })

            return result[0]

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }
}