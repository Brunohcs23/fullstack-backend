import { Accounts } from "../../src/model/Accounts";
import { Users } from "../../src/model/Users";
import { accTest } from "../modelMock/AccountMock";

export class UserDatabase {


    public async createUser(user: Users): Promise<void> {

    }

    public async createAccount(account: Accounts): Promise<void> {

    }

    public async getUserByEmail(email: string): Promise<Accounts | undefined> { 

        if(email === accTest.getEmail()){
            return accTest
        }
    }

    public async getUserById(id: string): Promise<void> {
        
    }
}

export default new UserDatabase()