import { CustomError } from "../errors/CustomError";
import { SignupInputDTO } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public async signup(user: SignupInputDTO) {

        try {

            if (!user.name || !user.email || !user.nickname || !user.password) {
                throw new CustomError(422, "Please check 'name', 'email', 'nickname' and 'password' were filled");
            }

            if (user.password.length < 7) {
                throw new CustomError(422, "Sorry, your 'password' must be at least 7 characters")
            }

            if (!user.email.includes("@")) {
                throw new CustomError(422, "Sorry, invalid 'email'.")
            }

            const id = this.idGenerator.generate();
            const cypherPassword = await this.hashManager.hash(user.password)

            /* Criar a função de chama o banco de dados */

            const token: string = this.authenticator.generateToken({ id })

            return token

        } catch (error) {

            if (error.message.includes("key 'email'")) {
                throw new CustomError(409, "Email already in use")
            }

            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async login() { }

}