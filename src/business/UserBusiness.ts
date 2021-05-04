import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../errors/CustomError";
import { Accounts, LoginInputDTO } from "../model/Accounts";
import { SignupInputDTO, Users } from "../model/Users";
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

    public async signup(user: SignupInputDTO): Promise<string> {
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

            const userId = this.idGenerator.generate()

            await this.userDatabase.createUser(
                new Users(userId, user.name, user.gender, user.birthDate, user.email, user.nickname)
            )

            const accId = this.idGenerator.generate()
            const cypherPassword = await this.hashManager.hash(user.password)

            await this.userDatabase.createAccount(
                new Accounts(accId, user.email, user.nickname, cypherPassword, userId)
            )

            const accessToken = this.authenticator.generateToken({ id: userId })

            return accessToken

        } catch (error) {
            if (error.message.includes("key 'email'")) {
                throw new CustomError(409, "Email already in use")
            }

            if (error.message.includes("key 'nickname'")) {
                throw new CustomError(409, "Nickname already in use")
            }

            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async login(user: LoginInputDTO): Promise<string> {
        try {

            if (!user.email || !user.password) {
                throw new CustomError(422, "Missing input! Check 'email' and 'password' were filled");
            }

            const authUser = await this.userDatabase.getUserByEmail(user.email)

            const passwordCompare = await this.hashManager.compare(user.password, authUser!.getPassword())

            if (!authUser && !passwordCompare) {
                throw new CustomError(401, "Invalid credentials");
            }

            const accessToken = this.authenticator.generateToken({ id: authUser!.getId() })

            return accessToken

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