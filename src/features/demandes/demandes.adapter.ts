import type{ DemandeEntity, DemandeRepository, DemandeOutput, DemandeInput } from "./demandes.entity";

export class InMemoryDemandeRepository implements DemandeRepository {
    private demandes: DemandeEntity[] = [];

    async create(demande: DemandeEntity): Promise<DemandeEntity> {
        this.demandes.push(demande);
        return demande;
    }

    async findAll(): Promise<DemandeEntity[]> {
        return this.demandes;
    }

    async findByEmail(email: string): Promise<DemandeEntity[]> {
        return this.demandes.filter(demande => demande.authorEmail === email);
    }

    async updateStatus(id: string, status: 'open' | 'in_progress' | 'closed'): Promise<DemandeEntity | null> {
        const demande = this.demandes.find(d => d.id === id);   
        if (demande) {
            demande.status = status;
            return demande;
        }
        return null;
    }


}