import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  requester_id: number;

  @Column({ nullable: true })
  assignee_id: number;

  @Column({
    type: 'simple-enum',
    enum: TicketPriority,
    default: TicketPriority.MEDIUM,
  })
  priority: TicketPriority;

  @Column({
    type: 'simple-enum',
    enum: TicketTopic,
    default: TicketTopic.OTHER,
  })
  topic: TicketTopic;

  @Column({
    type: 'simple-enum',
    enum: TicketStatus,
    default: TicketStatus.CREATED,
  })
  status: TicketStatus;

  @CreateDateColumn()
  createdAt: Date;
}

