import { ImageDatabase } from "../data/ImageDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../errors/CustomError";
import { allImagesDTO, ImageInputDTO, Images } from "../model/Images";
import { Tags } from "../model/Tags";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ImageBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private imageDatabase: ImageDatabase,
        private userDatabase: UserDatabase
    ) { }

    public async createImage(token: string, input: ImageInputDTO): Promise<void> {
        try {

            if (!token) {
                throw new CustomError(422, "Sorry!You must be 'login' first")
            }

            if (!input.subtitle || !input.author || !input.file || !input.collection) {
                throw new CustomError(422, "Please check 'subtitle', 'author', 'file' and 'collection' were filled")
            }

            if (input.tags.length < 1) {
                throw new CustomError(422, "Please provide at least 1 'tag'!")
            }

            const authToken = this.authenticator.getData(token)

            const authUser = this.userDatabase.getUserById(authToken.id)

            if (!authUser) {
                throw new CustomError(404, "Sorry! User not found")
            }

            const imageId = this.idGenerator.generate()
            let imageTags: string[] = []

            for (let item of input.tags) {

                const newTagId = this.idGenerator.generate()
                const tag = await this.imageDatabase.findTag(item)

                if (!tag) {
                    await this.imageDatabase.createTag(
                        new Tags(newTagId, item)
                    )
                    imageTags.push(newTagId)

                } else {
                    imageTags.push(tag.getId())
                }
            }

            await this.imageDatabase.createImage(
                new Images(imageId, input.subtitle, input.author, input.file, input.collection, authToken.id)
            )

            for (let tag of imageTags) {
                await this.imageDatabase.addImageTag(imageId, tag)
            }

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async getAllImages(token: string): Promise<allImagesDTO[]> {

        try {

            if (!token) {
                throw new CustomError(422, "Sorry!You must be 'login' first")
            }

            const results = await this.imageDatabase.getAllImages()

            if (!results) {
                throw new CustomError(404, "Sorry! Try again in 1 minute")
            }

            return results

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async getImageById(token: string, id: string): Promise<any> {

        try {

            if (!token) {
                throw new CustomError(422, "Sorry!You must be 'login' first")
            }

            if (!id) {
                throw new CustomError(422, "Please check 'id' were filled")
            }

            const details = await this.imageDatabase.getImageDetails(id)
            const tags = await this.imageDatabase.getImageTags(id)

            if (!details && !tags) {
                throw new CustomError(404, "Sorry! Try again in 1 minute")
            }           

            

            return {details, tags}

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}

export default new ImageBusiness(
    new IdGenerator,
    new Authenticator,
    new ImageDatabase,
    new UserDatabase()
)