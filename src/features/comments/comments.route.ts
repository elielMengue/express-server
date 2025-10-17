

import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { commentService } from "./comments.service";

const router = Router();

const commentSchema = z.object({
	title: z.string(),
	message: z.string().min(25),
	author: z.string().optional(),
});

router.post("/publish", async (req: Request, res: Response) => {
	const result = commentSchema.safeParse(req.body);

	if (!result.success) {
		return res.status(400).json({ error: result.error });
	}

	const comment = await commentService.publishComment(result.data);
	res.status(200).json(comment);
});

router.get("/", async (_: Request, res: Response) => {
	const comments = await commentService.listComment();
	res.status(200).json(comments);
});

export default router;
