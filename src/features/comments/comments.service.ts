
import type {
	commentEntity,
	commentInput,
	commentOutput,
	commentRepository,
} from "./comments.entity";

import generatedId from "@/lib/ids";
import { InMemoryCommentRepository } from "@/features/comments/comments.adapter";

export class CommentService {
	private repository: commentRepository;

	constructor(repository: commentRepository) {
		this.repository = repository;
	}

	async publishComment(input: commentInput): Promise<commentOutput> {
		console.log(input);

		const entity: commentEntity = {
			title: input.title,
			message: input.message,
			author: input.author ?? "Anonymous",
			id: generatedId(),
			publishedAt: new Date(),
		};

		const comment = await this.repository.publish(entity);

		const result: commentOutput = {
			id: comment.id,
			title: comment.title,
			message: comment.message,
			publishedAt: comment.publishedAt,
		};

		console.log(result);

		return result;
	}

	async listComment(): Promise<commentEntity[]> {
		console.log("listing comments");

		const comments = await this.repository.findAll();
		return comments;
	}
}

const repository = new InMemoryCommentRepository();
export const commentService = new CommentService(repository);
