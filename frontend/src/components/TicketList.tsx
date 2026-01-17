import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketsApi } from '../services/api';
import { TicketStatus, TicketPriority, TicketTopic } from '../types';
import type { Ticket } from '../types';
import { Plus, Trash2, Edit2, CheckCircle2, Circle, Clock, Tag, User, AlertCircle } from 'lucide-react';

export const TicketList: React.FC = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            setLoading(true);
            const data = await ticketsApi.getAll();
            setTickets(data);
        } catch (err) {
            setError('Failed to load tickets');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this ticket?')) return;
        try {
            await ticketsApi.delete(id);
            setTickets(tickets.filter(t => t.id !== id));
        } catch (err) {
            alert('Failed to delete ticket');
        }
    };

    const getStatusIcon = (status: TicketStatus) => {
        switch (status) {
            case TicketStatus.COMPLETED: return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case TicketStatus.IN_PROGRESS: return <Clock className="w-4 h-4 text-yellow-500" />;
            default: return <Circle className="w-4 h-4 text-blue-500" />;
        }
    };

    const getStatusStyle = (status: TicketStatus) => {
        switch (status) {
            case TicketStatus.COMPLETED: return 'bg-green-500/10 text-green-400 border-green-500/20';
            case TicketStatus.IN_PROGRESS: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        }
    };

    const getPriorityColor = (priority: TicketPriority) => {
        switch (priority) {
            case TicketPriority.HIGH: return 'text-red-400 bg-red-500/10 border-red-500/20';
            case TicketPriority.MEDIUM: return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            case TicketPriority.LOW: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        }
    };

    const getTopicColor = (topic: TicketTopic) => {
        switch (topic) {
            case TicketTopic.BUG: return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
            case TicketTopic.BILLING: return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
            case TicketTopic.FEATURE: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
        }
    };

    if (loading) return <div className="text-center p-8 text-white">Loading tickets...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 mb-20">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Ticket Management
                    </h1>
                    <p className="text-gray-400 mt-2">Manage and track your tasks efficiently</p>
                </div>
                <button
                    onClick={() => navigate('/create')}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    New Ticket
                </button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <div className="grid gap-4">
                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all hover:shadow-xl hover:shadow-black/50"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                                        {ticket.title}
                                    </h3>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusStyle(ticket.status)}`}>
                                        {getStatusIcon(ticket.status)}
                                        {ticket.status.replace('_', ' ')}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getPriorityColor(ticket.priority)}`}>
                                        <AlertCircle className="w-3 h-3" />
                                        {ticket.priority}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getTopicColor(ticket.topic)}`}>
                                        <Tag className="w-3 h-3" />
                                        {ticket.topic}
                                    </span>
                                </div>

                                <p className="text-gray-400 line-clamp-2 mb-4">{ticket.description}</p>

                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>Req: {ticket.requester_id}</span>
                                    </div>
                                    {ticket.assignee_id && (
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <span>Assignee: {ticket.assignee_id}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                                <button
                                    onClick={() => navigate(`/edit/${ticket.id}`)}
                                    className="p-2 hover:bg-zinc-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                                    title="Edit"
                                >
                                    <Edit2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(ticket.id)}
                                    className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {tickets.length === 0 && (
                    <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
                        <p className="text-gray-500 text-lg">No tickets found. Create your first one!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
