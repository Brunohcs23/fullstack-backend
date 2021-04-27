import { User } from "../../src/model/User";
import { userMock } from "../modelMock/UserMock";

export class UserDatabaseMock {

    public async createUser(user: User): Promise<void> {

    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        if (email === userMock.getEmail()) {
            return userMock
        }
    }

}

export default new UserDatabaseMock()