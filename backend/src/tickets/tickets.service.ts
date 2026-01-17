import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private ticketsRepository: Repository<Ticket>,
    ) { }

    create(createTicketDto: CreateTicketDto): Promise<Ticket> {
        const ticket = this.ticketsRepository.create(createTicketDto);
        return this.ticketsRepository.save(ticket);
    }

    findAll(): Promise<Ticket[]> {
        return this.ticketsRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Ticket> {
        const ticket = await this.ticketsRepository.findOneBy({ id });
        if (!ticket) {
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }
        return ticket;
    }

    async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
        const ticket = await this.findOne(id);
        const updatedTicket = Object.assign(ticket, updateTicketDto);
        return this.ticketsRepository.save(updatedTicket);
    }

    async remove(id: string): Promise<void> {
        const result = await this.ticketsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }
    }
}
