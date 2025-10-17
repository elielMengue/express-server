import generatedId from "@/lib/ids";
import type {
	DemandeEntity,
	DemandeInput,
	DemandeOutput,
	DemandeRepository,
} from "@/features/demandes/demandes.entity";
import { InMemoryDemandeRepository } from "./demandes.adapter";

export class DemandeService {
	private repository: DemandeRepository;

	constructor(repository: DemandeRepository) {
		this.repository = repository;
	}

	async createDemande(input: DemandeInput): Promise<DemandeOutput> {
		console.log(input);

		const entity: DemandeEntity = {
			id: generatedId(),
			title: input.title,
			description: input.description,
			authorEmail: input.authorEmail ?? null,
			status: "open",
			createdAt: new Date(),
		};

		const demande = await this.repository.create(entity);

		const result: DemandeOutput = {
			title: demande.title,
			description: demande.description,
			status: demande.status,
			authorEmail: demande.authorEmail,
			createdAt: demande.createdAt,
		};

		console.log(result);

		return result;
	}

	async listDemandes(): Promise<DemandeEntity[]> {
		console.log("listing demandes");

		const demandes = await this.repository.findAll();
		return demandes;
	}

	async listDemandesByEmail(email: string): Promise<DemandeEntity[]> {
		console.log(`listing demandes for email: ${email}`);

		const demandes = await this.repository.findByEmail(email);
		return demandes;
	}
}

export const repository = new InMemoryDemandeRepository();
export const demandeService = new DemandeService(repository);
