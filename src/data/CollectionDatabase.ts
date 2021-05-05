import { BaseDatabase } from "./BaseDatabase";
import { Collections } from "../model/Collections";

export class CollectionDatabase extends BaseDatabase {

    private TABLE_COLLECTIONS = process.env.DB_TABLE_COLLECTIONS
    private TABLE_COLLECTION_IMAGES = process.env.DB_TABLE_COLLECTION_IMAGES

    public async createCollections(collection: Collections, image?: string): Promise<void> {

        try {
            await this.getConnection()
                .insert({
                    id: collection.getId(),
                    title: collection.getTitle(),
                    subtitle: collection.getSubtitle(),
                    image,
                    account_id: collection.getAccountId()
                })
                .into(this.TABLE_COLLECTIONS!)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async insertImageInCollection(collectionId: string, imageId: string): Promise<void> {

        try {
            await this.getConnection()
                .insert({
                    collection_id: collectionId,
                    image_id: imageId
                })
                .into(this.TABLE_COLLECTION_IMAGES!)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }
}

export default new CollectionDatabase()