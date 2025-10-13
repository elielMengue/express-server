

export type commentEntity = {
    id: string,
    author: string,
    title: string,
    message: string,
    publishedAt: Date,
}

export type commentInput = {
    title: string,
    author: string
    message: string,
    publishedAt: Date
}

export type commentOutput = {
    message: string,
    publishedAt: Date
}


export interface commentRepository {
    publish:(comment: commentEntity) => Promise<commentEntity>,
    delete:(id: string) => Promise<void>,
    findAll:() => Promise<commentEntity[]>
}