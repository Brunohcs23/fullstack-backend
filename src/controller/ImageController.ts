import { Request, Response } from "express";
import imageBusiness from "../business/ImageBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { ImageInputDTO } from "../model/Images";

export class ImageContoller {

    public async createImage(req: Request, res: Response) {
        try {

            const token: string | undefined = req.headers.authorization

            const input: ImageInputDTO = {
                subtitle: req.body.subtitle,
                author: req.body.author,
                file: req.body.file,
                tags: req.body.tags,
                collection: req.body.collection
            }

            await imageBusiness.createImage(token!, input)

            res.status(200).send("Success")

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

        await BaseDatabase.destroyConnection();
    }

    public async allImages(req: Request, res: Response) {

        try {

            const token = req.headers.authorization

            const images = await imageBusiness.getAllImages(token)

            res.status(200).send({ Results: images })

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }
    }
}

export default new ImageContoller()