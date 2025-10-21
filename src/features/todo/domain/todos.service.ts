

import {type Todo, type TodoRepository } from './todo.entity.js';


export interface CreateTodoInput {
	title: string;
	description?: string;
}

export class TodoServices {
    private repository: TodoRepository

    constructor(repository: TodoRepository){
        this.repository = repository
    }

    getTodoList(): Promise<Todo[]>{
        return Promise.resolve(this.repository.findAll())
    }

    createTodo(todo: CreateTodoInput): Promise<Todo> {
        const result = this.repository.create({
            ...todo,
            id: crypto.randomUUID(),
            status: 'PENDING ...'
        })

        return Promise.resolve(result);
    }

    findById(id: string): Promise<Todo | null>{
        return this.repository.findById(id)
    }

    updateTodo(id: string, todo: Todo): Promise<Todo[]>{
        return this.repository.update(id, todo)
    }

    deleteTodo(id: string): Promise<void>{
        return this.repository.delete(id)
    }
}




