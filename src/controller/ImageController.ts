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

            const data = await imageBusiness.getAllImages(token)

            res.status(200).send({ Results: data })

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

        await BaseDatabase.destroyConnection();
    }

    public async getImageById(req: Request, res: Response) {

        try {
            const token = req.headers.authorization
            const id: string = req.params.id as string

            const data = await imageBusiness.getImageById(token, id)

            res.status(200).send(data)

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

        await BaseDatabase.destroyConnection();
    }
}

export default new ImageContoller()