import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../errors/CustomError";
import { LoginInputDTO, SignupInputDTO, User } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private userDatabase: UserDatabase
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

            await this.userDatabase.createUser(
                new User(id, user.name, user.email, user.nickname, cypherPassword)
            )

            const token: string = this.authenticator.generateToken({ id })

            return token

        } catch (error) {

            if (error.message.includes("key 'email'")) {
                throw new CustomError(409, "Email already in use")
            }

            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async login(user: LoginInputDTO) {

        try {

            if (!user.email || !user.password) {
                throw new CustomError(422, "Missing input! Check 'email' and 'password' were filled");
            }

            /* 
            Checar no banco se existe o usuario por email.
            Futura implementação de busca por nickname tambem.
            */

            const authUser = await this.userDatabase.getUserByEmail(user.email)

            if (!authUser) {
                throw new CustomError(401, "Invalid credentials");
            }

            const passwordCompare = await this.hashManager.compare(user.password, authUser.getPassword())

            if (!passwordCompare) {
                throw new CustomError(401, "Invalid Password!")
            }

            const token = this.authenticator.generateToken({ id: authUser.getId() })

            return token

        } catch (error) {

            throw new CustomError(error.statusCode, error.message)
            
        }
    }

}

export default new UserBusiness(
    new IdGenerator(),
    new HashManager(),
    new Authenticator(),
    new UserDatabase()
)