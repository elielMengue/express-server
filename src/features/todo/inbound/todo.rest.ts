

import { type Request, type Response, Router } from 'express';
import { z} from 'zod'
import type { TodoServices } from '../domain/todos.service';

const router = Router();

const CreateTodoSchema = z.object({
   title: z.string().min(8),
   description: z.string().optional()
})

const UpdateTodoSchema = z.object({
   title: z.string().min(8),
   description: z.string().optional()
})


export function createTodoController(service: TodoServices){

   router.get('/', (_:Request, res:Response) =>{
      const todos = service.getTodoList();
      res.json(todos);
   })

   router.post('/', (req:Request, res:Response) =>{
      
      const input = CreateTodoSchema.safeParse(req.body)

      if(!input.success){
         return res.status(400).json({error: input.error.issues})
      }

      const todo =service.createTodo(input.data)
      return res.json(todo)
   })

   router.put('/:id', async (req:Request, res:Response) =>{
         const {id} = req.params
         const input = UpdateTodoSchema.safeParse(req.body)

         if(!input.success){
            return res.status(400).json({message:'BAD REQUEST'})
         }

         const todo = await service.updateTodo(id as string, input.data as any)
         return res.json(todo)
   })

   router.delete('/:id', (req:Request, res:Response) =>{
      const {id} = req.params
      service.deleteTodo(id as string)
      return res.status(204).send();
   })

   return router;
}




