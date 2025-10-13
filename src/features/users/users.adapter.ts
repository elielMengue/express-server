import type { UserEntry, UserRepository } from "./users.entity";

export class InMemoryUserRepository implements UserRepository {
	private db: UserEntry[] = [];

	async create(user: UserEntry): Promise<UserEntry> {
		this.db.push(user);
		return Promise.resolve(user);
	}

	async findAll(): Promise<UserEntry[]> {
		return Promise.resolve(this.db);
	}

	async findById(id: string): Promise<UserEntry | undefined> {
		return Promise.resolve(this.db.find((user) => user.id === id));
	}

	async update(user: UserEntry): Promise<UserEntry> {
		this.db = this.db.map((u) => (u.id === user.id ? user : u));
		return Promise.resolve(user);
	}

	async delete(id: string): Promise<void> {
		this.db = this.db.filter((user) => user.id !== id);
	}
}