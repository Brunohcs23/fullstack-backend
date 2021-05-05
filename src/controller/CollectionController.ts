import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import collectionBusiness from "../business/CollectionBusiness"
import { CollectionInputDTO } from "../model/Collections";

export class CollectionController {

    public async createCollection(req: Request, res: Response) {

        try {

            const token = req.headers.authorization

            const input: CollectionInputDTO = {
                title: req.body.title,
                subtitle: req.body.subtitle,
                image: req.body.image
            }

            await collectionBusiness.createCollection(token, input)

            res.status(200).send(`Collection ${input.title} created!`)

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

        await BaseDatabase.destroyConnection();
    }
}

export default new CollectionController()