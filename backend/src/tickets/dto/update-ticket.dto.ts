import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TicketStatus } from '../ticket.entity';

export class UpdateTicketDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TicketStatus)
    @IsOptional()
    status?: TicketStatus;
}
