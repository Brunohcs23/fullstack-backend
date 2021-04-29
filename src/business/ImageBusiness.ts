import { CustomError } from "../errors/CustomError";
import { ImageDatabase } from "../data/ImageDatabase";
import { Image, ImageInputDTO, TagsDTO } from "../model/Media";
import { IdGenerator } from "../services/IdGenerator";

export class ImageBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private imageDatabase: ImageDatabase
    ) { }

    public async createImage(input: ImageInputDTO): Promise<void> {
        try {

            if (!input.subtitle || !input.author || !input.file || !input.collection) {
                throw new CustomError(422, "Please check 'subtitle', 'author', 'file' and 'collection' were filled")
            }

            if(input.tags.length < 1){
                throw new CustomError(422, "Please provide at least 1 'tag'!")
            }

            const imageId = this.idGenerator.generate()

            for (let item of input.tags) {
                const tag: TagsDTO = await this.imageDatabase.findTag(item)

                if (!tag) {
                    const tagId = this.idGenerator.generate()
                    await this.imageDatabase.createTag({ id: tagId, name: item })
                    await this.imageDatabase.createImage(
                        new Image(imageId, input.subtitle, input.author, new Date(), input.file, input.collection)
                    )
                    await this.imageDatabase.addImageTags(imageId, tagId)
                }

                await this.imageDatabase.createImage(
                    new Image(imageId, input.subtitle, input.author, new Date(), input.file, input.collection)
                )
                await this.imageDatabase.addImageTags(imageId, tag.id)
            }

        } catch (error) {

            throw new CustomError(error.statusCode, error.message)
        }
    }
}

export default new ImageBusiness(
    new IdGenerator(),
    new ImageDatabase()
)