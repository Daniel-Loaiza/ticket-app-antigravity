import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TicketStatus } from '../ticket.entity';

export class CreateTicketDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(TicketStatus)
    @IsOptional()
    status?: TicketStatus;
}
