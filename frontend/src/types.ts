export const TicketStatus = {
    CREATED: 'CREATED',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
} as const;

export type TicketStatus = typeof TicketStatus[keyof typeof TicketStatus];

export const TicketPriority = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
} as const;

export type TicketPriority = typeof TicketPriority[keyof typeof TicketPriority];

export const TicketTopic = {
    BILLING: 'BILLING',
    BUG: 'BUG',
    FEATURE: 'FEATURE',
    OTHER: 'OTHER',
} as const;

export type TicketTopic = typeof TicketTopic[keyof typeof TicketTopic];

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
