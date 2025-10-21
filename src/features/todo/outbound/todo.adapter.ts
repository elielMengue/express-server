/*  IMPLEMENTATION DE BASE DE DONNEE ICI  */

import type {Todo, TodoRepository } from "../domain/todo.entity";

export class InMemeroyTodo implements TodoRepository {
    private db: Todo[] = [];

   async create(todo: Todo) : Promise<Todo>{
        this.db.push(todo);
        return Promise.resolve(todo);
    }

    async findAll(): Promise<Todo[]> {
        return this.db;
    }

    async findById(id: string): Promise<Todo | null>{
        const rs = this.db.find((todo) => todo.id === id) ?? null ;
        return Promise.resolve(rs)
    }

    async update(id: string, todo: Todo): Promise<Todo[]>{
        return this.db.map((t) => (t.id === todo.id ? todo : t));
    }


     delete(id: string): Promise<void> {
        const index = this.db.filter((todo) => todo.id !== id)
        return Promise.resolve();
    }
}