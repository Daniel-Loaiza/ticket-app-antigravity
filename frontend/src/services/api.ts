import axios from 'axios';
import type { CreateTicketDto, UpdateTicketDto, Ticket } from '../types';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ticketsApi = {
    getAll: async () => {
        const response = await api.get<Ticket[]>('/tickets');
        return response.data;
    },
    getOne: async (id: string) => {
        const response = await api.get<Ticket>(`/tickets/${id}`);
        return response.data;
    },
    create: async (data: CreateTicketDto) => {
        const response = await api.post<Ticket>('/tickets', data);
        return response.data;
    },
    update: async (id: string, data: UpdateTicketDto) => {
        const response = await api.patch<Ticket>(`/tickets/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/tickets/${id}`);
    },
};
