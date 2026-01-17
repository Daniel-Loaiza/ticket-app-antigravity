import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, ListTodo, Edit2, CheckCircle2, Circle, Tag, User, AlertCircle } from 'lucide-react';
import { ticketsApi } from '../services/api';
import { TicketStatus, TicketPriority, TicketTopic } from '../types';
import type { Ticket } from '../types';

export const SolverPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const solverId = searchParams.get('solverId');

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
            // Filter tickets by solverId if provided
            const filteredData = solverId
                ? data.filter(ticket => ticket.assignee_id === parseInt(solverId))
                : data;
            setTickets(filteredData);
        } catch (err) {
            setError('Failed to load tickets');
        } finally {
            setLoading(false);
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

    const pendingCount = tickets.filter(t => t.status === TicketStatus.CREATED).length;
    const inProgressCount = tickets.filter(t => t.status === TicketStatus.IN_PROGRESS).length;
    const completedCount = tickets.filter(t => t.status === TicketStatus.COMPLETED).length;

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate('/main')}
                    className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Main
                </button>

                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                        Solver Dashboard
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Resolve and manage your assigned tickets
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Pending</p>
                                <p className="text-2xl font-bold">{pendingCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <ListTodo className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">In Progress</p>
                                <p className="text-2xl font-bold">{inProgressCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Completed</p>
                                <p className="text-2xl font-bold">{completedCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center p-8 text-gray-400">Loading tickets...</div>
                ) : (
                    <div className="grid gap-4">
                        {tickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all hover:shadow-xl hover:shadow-black/50"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
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
                                    </div>
                                </div>
                            </div>
                        ))}

                        {tickets.length === 0 && (
                            <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
                                <p className="text-gray-500 text-lg">No tickets found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
