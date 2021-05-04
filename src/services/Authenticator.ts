import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class Authenticator {

  private static expiresIn: number = Number(process.env.JWT_EXPIRES_IN)

  public generateToken = (input: AuthenticationData): string => {
    const token = jwt.sign(
      {
        id: input.id
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: Authenticator.expiresIn,
      }
    );
    return token;
  }

  public getData = (token: string): AuthenticationData => {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id
    };
    return result;
  }
}

interface AuthenticationData {
  id: string;
}

export default new Authenticator()