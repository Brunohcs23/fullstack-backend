export class HashManagerMock {

    public hash = async (text: string): Promise<string> => {

        return "hash";
    }

    public compare = async (text: string, hash: string): Promise<boolean> => {
        
        return text === hash
    }

}

export default new HashManagerMock()