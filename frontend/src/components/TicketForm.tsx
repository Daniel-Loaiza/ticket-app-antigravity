import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ticketsApi } from '../services/api';
import { TicketStatus, TicketPriority, TicketTopic } from '../types';
import { ArrowLeft, Save } from 'lucide-react';

export const TicketForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        requester_id: number;
        assignee_id?: number;
        priority: TicketPriority;
        topic: TicketTopic;
        status: TicketStatus;
    }>({
        title: '',
        description: '',
        requester_id: 0,
        assignee_id: undefined,
        priority: TicketPriority.MEDIUM,
        topic: TicketTopic.OTHER,
        status: TicketStatus.CREATED,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isEditMode) {
            loadTicket(id!);
        }
    }, [id, isEditMode]);

    const loadTicket = async (ticketId: string) => {
        try {
            setLoading(true);
            const ticket = await ticketsApi.getOne(ticketId);
            setFormData({
                title: ticket.title,
                description: ticket.description,
                requester_id: ticket.requester_id,
                assignee_id: ticket.assignee_id,
                priority: ticket.priority,
                topic: ticket.topic,
                status: ticket.status,
            });
        } catch (err) {
            setError('Failed to load ticket');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation: Cannot transition to IN_PROGRESS without assignee
        if (formData.status === TicketStatus.IN_PROGRESS && !formData.assignee_id) {
            setError('An assignee is required to move a ticket to In Progress');
            return;
        }

        setLoading(true);

        try {
            if (isEditMode) {
                await ticketsApi.update(id!, formData);
            } else {
                await ticketsApi.create(formData);
            }
            navigate('/');
        } catch (err: any) {
            // Display backend error message if available
            const message = err.response?.data?.message || 'Failed to save ticket';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode && !formData.title) {
        return <div className="text-center p-8 text-white">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 mb-20">
            <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to List
            </button>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {isEditMode ? 'Edit Ticket' : 'Create New Ticket'}
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter ticket title"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Describe the issue..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Requester ID</label>
                            <input
                                type="number"
                                required
                                value={formData.requester_id}
                                onChange={(e) => setFormData({ ...formData, requester_id: parseInt(e.target.value) || 0 })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Assignee ID (Optional)</label>
                            <input
                                type="number"
                                value={formData.assignee_id || ''}
                                onChange={(e) => setFormData({ ...formData, assignee_id: e.target.value ? parseInt(e.target.value) : undefined })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Unassigned"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as TicketPriority })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            >
                                {Object.values(TicketPriority).map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Topic</label>
                            <select
                                value={formData.topic}
                                onChange={(e) => setFormData({ ...formData, topic: e.target.value as TicketTopic })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            >
                                {Object.values(TicketTopic).map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>


                        {isEditMode && (
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as TicketStatus })}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                >
                                    {Object.values(TicketStatus)
                                        .filter(status => {
                                            // Current status is always allowed (to stay on same status)
                                            if (status === formData.status) return true;

                                            // Valid transitions
                                            if (formData.status === TicketStatus.CREATED && status === TicketStatus.IN_PROGRESS) return true;
                                            if (formData.status === TicketStatus.IN_PROGRESS && status === TicketStatus.COMPLETED) return true;

                                            return false;
                                        })
                                        .map((s) => (
                                            <option key={s} value={s}>{s.replace('_', ' ')}</option>
                                        ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="w-5 h-5 mr-2" />
                        {loading ? 'Saving...' : 'Save Ticket'}
                    </button>
                </form>
            </div>
        </div>
    );
};
