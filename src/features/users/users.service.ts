/// [ROUTE/CONTROLLER] --> [USECASE/SERVICE] --> [REPOSITORY] --> [DATABASE]

import type {
	CreateUserInput,
	CreateUserOutput,
	UserEntry,
	UserRepository,
} from "./users.entity";

import { InMemoryUserRepository } from "./users.adapter";
import generateId  from "@/lib/ids";



/**
 * Responsabilités:
 * - Implémenter la logique métier (règles de gestion, orchester avec le repository, etc...)
 */

export class UserService {
	private repository: UserRepository;

	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	async createUser(input: CreateUserInput): Promise<CreateUserOutput> {
		console.log("creating user", input);

		const entity: UserEntry = {
			...input,
			id: generateId(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const user = await this.repository.create(entity);

		const result: CreateUserOutput = {
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};

		console.log("user created", result);

		return result;
	}

	async listUsers(): Promise<UserEntry[]> {
		console.log("listing users");
		const users = await this.repository.findAll();
		console.log("users found", users.length);
		return users;
	}
}

const repository = new InMemoryUserRepository();
export const userService = new UserService(repository);