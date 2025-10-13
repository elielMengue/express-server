

import { Router, type Request, type Response } from "express";
import { commentService } from "./comments.service";
import { z } from "zod"

const router = Router();

const commentSchema = z.object({
    message: z.string().min(25),
    title: z.string()
})

router.post('/comments/publish', (req: Request, res: Response) =>{
    const message = req.body;
    const result  = commentSchema.safeParse(message);

    if(!result.success){
        return res.status(400).json({ error: result.error});
    }

    const comment = commentService.publishComment(message);
    res.json(comment)

});

router.get('/', (_: Request, res: Response) =>{
    const comments = commentService.listComment();
    res.json(comments);
});


export default router;