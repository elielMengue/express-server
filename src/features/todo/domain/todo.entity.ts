

export type Todo = {
    id: string;
    title: string;
    status: string;
    description?: string;
}


export interface TodoRepository {
    create(todo: Todo): Promise<Todo>;
    findAll(): Promise<Todo[]>;
    findById(id: string) : Promise<Todo | null> ;
    update(id: string, todo: Todo) : Promise<Todo[]>;
    delete(id: string) : Promise<void> ;
};
