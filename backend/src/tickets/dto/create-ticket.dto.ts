import { IsString, IsEnum, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { TicketStatus, TicketPriority, TicketTopic } from '../ticket.entity';

export class CreateTicketDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    requester_id: number;

    @IsNumber()
    @IsOptional()
    assignee_id?: number;

    @IsEnum(TicketPriority)
    @IsNotEmpty()
    priority: TicketPriority;

    @IsEnum(TicketTopic)
    @IsNotEmpty()
    topic: TicketTopic;

    @IsEnum(TicketStatus)
    @IsOptional()
    status?: TicketStatus;
}
