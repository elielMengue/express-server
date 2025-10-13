import type { commentEntity, commentRepository } from "./comments.entity";  

export class InMemoryCommentRepository implements commentRepository {
    private db: commentEntity[] = [];

    async publish(comment: commentEntity): Promise<commentEntity>{
        this.db.push(comment);
        return Promise.resolve(comment);
    }

    async delete(id: string): Promise<void>{
        this.db = this.db.filter((comment) => comment.id != id);
    }

    async findAll(): Promise<commentEntity[]>{
        return Promise.resolve(this.db)
    }

}