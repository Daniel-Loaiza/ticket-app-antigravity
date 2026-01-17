import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { TicketStatus, TicketPriority, TicketTopic } from '../ticket.entity';

export class UpdateTicketDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    requester_id?: number;

    @IsNumber()
    @IsOptional()
    assignee_id?: number;

    @IsEnum(TicketPriority)
    @IsOptional()
    priority?: TicketPriority;

    @IsEnum(TicketTopic)
    @IsOptional()
    topic?: TicketTopic;

    @IsEnum(TicketStatus)
    @IsOptional()
    status?: TicketStatus;
}
