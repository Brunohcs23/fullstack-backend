import { Request, Response } from "express";
import userBusiness from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { LoginInputDTO, SignupInputDTO } from "../model/User";

export class UserController {

    public async signup(req: Request, res: Response) {
        try {

            const input: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password
            }

            const token = await userBusiness.signup(input)

            res.status(200).send(token);

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

        await BaseDatabase.destroyConnection();

    }

    public async login(req: Request, res: Response) {
        try {

            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await userBusiness.login(input)

            res.status(200).send(token);

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

        await BaseDatabase.destroyConnection();
    }

}

export default new UserController()