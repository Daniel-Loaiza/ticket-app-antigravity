export enum TicketStatus {
    CREATED = 'CREATED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

export enum TicketPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export enum TicketTopic {
    BILLING = 'BILLING',
    BUG = 'BUG',
    FEATURE = 'FEATURE',
    OTHER = 'OTHER',
}

export interface Ticket {
    id: string;
    title: string;
    description: string;
    requester_id: number;
    assignee_id?: number;
    priority: TicketPriority;
    topic: TicketTopic;
    status: TicketStatus;
    createdAt: string;
}

export interface CreateTicketDto {
    title: string;
    description: string;
    requester_id: number;
    assignee_id?: number;
    priority: TicketPriority;
    topic: TicketTopic;
    status?: TicketStatus;
}

export interface UpdateTicketDto {
    title?: string;
    description?: string;
    requester_id?: number;
    assignee_id?: number;
    priority?: TicketPriority;
    topic?: TicketTopic;
    status?: TicketStatus;
}
