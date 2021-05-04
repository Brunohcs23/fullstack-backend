export class Images {
    constructor(
        private id: string,
        private createdAt: Date,
        private subtitle: string,
        private author: string,
        private file: string,
        private tags: string[] = [],
        private collection: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getCreatedAt(): Date {
        return this.createdAt
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

    public getTags(): string[] {
        return this.tags
    }

    public getCollection(): string {
        return this.collection
    }
}

export interface ImageInputDTO {
    subtitle: string,
    author: string,
    file: string,
    tags: string[],
    collection: string
}

export interface DbImageInputDTO { 
    id: string,
    subtitle: string,
    author: string,
    file: string,
    collection: string,
    accountId: string
}
