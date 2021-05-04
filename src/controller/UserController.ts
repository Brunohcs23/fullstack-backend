import { BaseDatabase } from "../data/BaseDatabase";
import { Accounts } from "../model/Accounts";
import { Users } from "../model/Users";

export class UserDatabase extends BaseDatabase {

    private TABLE_USERS = process.env.DB_TABLE_USERS
    private TABLE_ACCOUNTS = process.env.DB_TABLE_ACCOUNTS

    private toModel(dbModel?: any): Accounts | undefined {
        return (dbModel &&
            new Accounts(
                dbModel.id,
                dbModel.email,
                dbModel.nickname,
                dbModel.password,
                dbModel.userId
            )
        )
    };

    public async createUser(user: Users): Promise<void> {
        try {

            await this.getConnection()
                .insert({
                    id: user.getId(),
                    name: user.getName(),
                    gender: user.getGender(),
                    birth_date: user.getBirthDate(),
                    email: user.getEmail(),
                    nickname: user.getNickname()
                })
                .into(this.TABLE_USERS!)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async createAccount(account: Accounts): Promise<void> {
        try {

            await this.getConnection()
                .insert({
                    id: account.getId(),
                    email: account.getEmail(),
                    nickname: account.getNickname(),
                    password: account.getPassword(),
                    user_id: account.getUserId()
                })
                .into(this.TABLE_ACCOUNTS!)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async getUserByEmail(email: string): Promise<Accounts | undefined> {
        try {
            const [result] = await this.getConnection()
                .select("*")
                .from(this.TABLE_ACCOUNTS!)
                .where({ email })

            return this.toModel(result)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }

    public async getUserById(id: string): Promise<any> {
        try {

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }
}

export default new UserDatabase()