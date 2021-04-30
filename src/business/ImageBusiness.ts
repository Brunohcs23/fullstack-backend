import { CustomError } from "../errors/CustomError";
import { ImageDatabase } from "../data/ImageDatabase";
import { ImageInputDTO, TagsDTO } from "../model/Media";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";

export class ImageBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private imageDatabase: ImageDatabase
    ) { }

    public async createImage(token: string, input: ImageInputDTO): Promise<void> {
        try {

            if (!token) {
                throw new CustomError(422, "Sorry!You must be 'login' to use these resource")
            }

            const authToken = this.authenticator.getData(token)

            if(!authToken.id){
                throw new CustomError(404, "Sorry! User not found")
            }

            if (!input.subtitle || !input.author || !input.file || !input.collection) {
                throw new CustomError(422, "Please check 'subtitle', 'author', 'file' and 'collection' were filled")
            }

            if (input.tags.length < 1) {
                throw new CustomError(422, "Please provide at least 1 'tag'!")
            }

            const imageId = this.idGenerator.generate()
            let imageTags: string[] = []

            for (let item of input.tags) {

                const tagId = this.idGenerator.generate()
                const tag: TagsDTO = await this.imageDatabase.findTag(item)

                if (!tag) {
                    await this.imageDatabase.createTag({ id: tagId, name: item })
                    imageTags.push(tag.id)

                } else {
                    imageTags.push(tag.id)
                }
            }

            await this.imageDatabase.createImage(imageId, input.subtitle, input.author, new Date(), input.file, input.collection)

            for (let tag of imageTags) {
                await this.imageDatabase.addImageTags(imageId, tag)
            }

        } catch (error) {

            throw new CustomError(error.statusCode, error.message)
        }
    }
}

export default new ImageBusiness(
    new IdGenerator(),
    new Authenticator(),
    new ImageDatabase()
)