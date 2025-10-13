export type UserEntry = {
	id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: string; // admin, client, technician
	createdAt: Date;
	updatedAt: Date;
};

export interface UserRepository {
	create: (user: UserEntry) => Promise<UserEntry>;
	findAll: () => Promise<UserEntry[]>;
	findById: (id: string) => Promise<UserEntry | undefined>;
	update: (user: UserEntry) => Promise<UserEntry>;
	delete: (id: string) => Promise<void>;
}

export type CreateUserInput = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: string; // admin, client, technician
};

export type CreateUserOutput = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string; // admin, client, technician
	createdAt: Date;
	updatedAt: Date;
};