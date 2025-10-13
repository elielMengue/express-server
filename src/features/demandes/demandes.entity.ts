

export type DemandeEntity = {
    id: string;
    authorEmail: string;
    title: string;
    description: string;
    status: 'open' | 'in_progress' | 'closed';
    createdAt: Date;
}

export type DemandeInput = {
    title: string;
    description: string;
}

export type DemandeOutput = {
    title: string;
    authorEmail: string | null;
    description: string;
    status: 'open' | 'in_progress' | 'closed';
    createdAt: Date;
}

export interface DemandeRepository {
    create(demande: DemandeEntity): Promise<DemandeEntity>;
    findAll(): Promise<DemandeEntity[]>;
    findByEmail(email: string): Promise<DemandeEntity[]>;
    updateStatus(id: string, status: 'open' | 'in_progress' | 'closed'): Promise<DemandeEntity | null>;
}