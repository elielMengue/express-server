import { TodoServices } from "./domain/todos.service";
import { createTodoController } from "./inbound/todo.rest";
import { InMemeroyTodo } from "./outbound/todo.adapter";

const repository = new InMemeroyTodo();
const service = new TodoServices(repository);
const router = createTodoController(service);

export default router ;