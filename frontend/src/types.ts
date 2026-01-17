export enum TicketStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    CLOSED = 'CLOSED',
}

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    createdAt: string;
}

export interface CreateTicketDto {
    title: string;
    description: string;
    status?: TicketStatus;
}

export interface UpdateTicketDto {
    title?: string;
    description?: string;
    status?: TicketStatus;
}
