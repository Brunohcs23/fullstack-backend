export class Tags {
    constructor(
        private id: string,
        private name: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }
}

export interface DbTagDTO {
    id: string,
    name: string
}