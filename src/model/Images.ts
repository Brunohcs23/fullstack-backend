export class Images {
    constructor(
        private id: string,
        private subtitle: string,
        private author: string,
        private file: string,
        private collection: string,
        private accountId: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getSubtitle(): string {
        return this.subtitle
    }

    public getAuthor(): string {
        return this.author
    }

    public getFile(): string {
        return this.file
    }

    public getCollection(): string {
        return this.collection
    }

    public getAccountId(): string { 
        return this.accountId
    }
}

export interface ImageInputDTO {
    subtitle: string,
    author: string,
    file: string,
    tags: string[],
    collection: string
}
