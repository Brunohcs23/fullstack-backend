export class Image {
    constructor(
        private id: string,
        private subtitle: string,
        private author: string,
        private date: Date = new Date(),
        private file: string,
        private collection: string
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

    public getDate(): Date {
        return this.date
    }

    public getFile(): string {
        return this.file
    }

    public getCollection(): string {
        return this.collection
    }
}

export class Tags {
    constructor(
        private tags: string[] = []
    ) { }

    public getTags(): string[] { 
        return this.tags
    }
}

export interface ImageInputDTO {
    subtitle: string,
    author: string,
    file: string,
    tags: string[]
    collection: string
}

export interface TagsDTO {
    id: string,
    name: string
}