import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    private TABLE_NAME: string = "tabela criada para os usuarios"

    public async createUser(user: User): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    nikname: user.getNickname(),
                    password: user.getPassword()
                })
                .into(this.TABLE_NAME)

        } catch (error) {
            throw new Error(error.sqlmessage || error.message);
        }
    }
}