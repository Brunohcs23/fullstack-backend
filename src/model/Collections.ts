export class Collections {

    constructor(
        private id: string,
        private title: string,
        private subtitle: string,
        private accountId: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getTitle(): string {
        return this.title
    }

    public getSubtitle(): string {
        return this.subtitle
    }

    public getAccountId(): string {
        return this.accountId
    }
}

export interface CollectionInputDTO {
    title: string,
    subtitle: string,
    image?: string
}

export interface DbInputImageCollection {
    collectionId: string,
    imageId: string
}