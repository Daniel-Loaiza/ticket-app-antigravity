import { Injectable, NotFoundException, MethodNotAllowedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketStatus } from './ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private ticketsRepository: Repository<Ticket>,
    ) { }

    create(createTicketDto: CreateTicketDto): Promise<Ticket> {
        // Rule: Every ticket must always start with status = created
        const ticket = this.ticketsRepository.create({
            ...createTicketDto,
            status: TicketStatus.CREATED
        });
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

        // Validate status transition
        if (updateTicketDto.status && updateTicketDto.status !== ticket.status) {
            this.validateStatusTransition(ticket.status, updateTicketDto.status);
        }

        // Rule: A ticket can only transition to in_progress if assignee_id is present
        const newStatus = updateTicketDto.status || ticket.status;
        const newAssigneeId = updateTicketDto.assignee_id !== undefined ? updateTicketDto.assignee_id : ticket.assignee_id;

        if (newStatus === TicketStatus.IN_PROGRESS && !newAssigneeId) {
            throw new BadRequestException('Cannot transition to IN_PROGRESS without an assignee');
        }

        const updatedTicket = Object.assign(ticket, updateTicketDto);
        return this.ticketsRepository.save(updatedTicket);
    }

    async remove(id: string): Promise<void> {
        // Rule: Tickets must never be physically deleted
        throw new MethodNotAllowedException('Deleting tickets is not allowed. Please update status to COMPLETED instead.');
    }

    private validateStatusTransition(currentStatus: TicketStatus, newStatus: TicketStatus): void {
        const validTransitions: Record<TicketStatus, TicketStatus[]> = {
            [TicketStatus.CREATED]: [TicketStatus.IN_PROGRESS],
            [TicketStatus.IN_PROGRESS]: [TicketStatus.COMPLETED],
            [TicketStatus.COMPLETED]: [], // No transitions from COMPLETED
        };

        if (!validTransitions[currentStatus]?.includes(newStatus)) {
            throw new BadRequestException(`Invalid status transition from ${currentStatus} to ${newStatus}`);
        }
    }
}
