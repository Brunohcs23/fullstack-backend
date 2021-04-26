import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {

    public async signup(req: Request, res: Response) {
        try {

            const { name, email, nickname, password } = req.body

            res.status(200).send();

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

        await BaseDatabase.destroyConnection();

    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            res.status(200).send();

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

        await BaseDatabase.destroyConnection();
    }

}

export default new UserController()