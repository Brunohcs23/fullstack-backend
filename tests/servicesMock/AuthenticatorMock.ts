export class AuthenticatorMock {

  public generateToken = (input: AuthenticationData): string => {

    return "token";
  }

  public getData = (token: string): AuthenticationData | {} => {

    if (!token) {
      throw new Error("Check AuthenticatorMock");
    }

    if (token === "invalid") {
      return {}
    }

    return {
      id: "id"
    }
  }
}

interface AuthenticationData {
  id: string;
}

export default new AuthenticatorMock()