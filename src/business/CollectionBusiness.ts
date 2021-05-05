import { CollectionDatabase } from "../data/CollectionDatabase";
import { ImageDatabase } from "../data/ImageDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../errors/CustomError";
import { CollectionInputDTO, Collections, DbInputImageCollection } from "../model/Collections";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class CollectionBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private collectionDatabase: CollectionDatabase,
        private userDatabase: UserDatabase,
        private imageDatabase: ImageDatabase
    ) { }

    public async createCollection(token: string, input: CollectionInputDTO): Promise<void> {

        try {

            if (!token) {
                throw new CustomError(422, "Sorry!You must be 'login' first")
            }

            if (!input.title || !input.subtitle) {
                throw new CustomError(422, "Please check 'title', 'subtitle',  were filled")
            }

            const authToken = this.authenticator.getData(token)

            const authUser = this.userDatabase.getUserById(authToken.id)

            if (!authUser) {
                throw new CustomError(404, "Sorry! User not found")
            }

            const collectionId = this.idGenerator.generate()

            await this.collectionDatabase.createCollections(
                new Collections(collectionId, input.title, input.subtitle, authToken.id),
                input.image
            )

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async insertImage(token: string, input: DbInputImageCollection): Promise<void> {

        try {

            if (!token) {
                throw new CustomError(422, "Sorry!You must be 'login' first")
            }

            if (!input.collectionId || !input.imageId) {
                throw new CustomError(422, "Please check 'collectionId' and 'imageId' were filled")
            }

            const authToken = this.authenticator.getData(token)

            const authUser = this.userDatabase.getUserById(authToken.id)

            if (!authUser) {
                throw new CustomError(404, "Sorry! User not found")
            }

            const checkImage = await this.imageDatabase.getImageDetails(input.imageId)

            if (!checkImage) {
                throw new CustomError(404, "Sorry! Image not found")
            }

            await this.collectionDatabase.insertImageInCollection(input.collectionId, checkImage.getId())


        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}

export default new CollectionBusiness(
    new IdGenerator,
    new Authenticator,
    new CollectionDatabase(),
    new UserDatabase(),
    new ImageDatabase()
)