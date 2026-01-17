import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ticketsApi } from '../services/api';
import { TicketStatus } from '../types';
import { ArrowLeft, Save } from 'lucide-react';

export const TicketForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: TicketStatus.OPEN,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isEditMode) {
            loadTicket(id);
        }
    }, [id]);

    const loadTicket = async (ticketId: string) => {
        try {
            setLoading(true);
            const ticket = await ticketsApi.getOne(ticketId);
            setFormData({
                title: ticket.title,
                description: ticket.description,
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
        setLoading(true);

        try {
            if (isEditMode) {
                await ticketsApi.update(id, formData);
            } else {
                await ticketsApi.create(formData);
            }
            navigate('/');
        } catch (err) {
            setError('Failed to save ticket');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode && !formData.title) {
        return <div className="text-center p-8 text-white">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
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
                    <div>
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

                    <div>
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
                        <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as TicketStatus })}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                            <option value={TicketStatus.OPEN}>Open</option>
                            <option value={TicketStatus.IN_PROGRESS}>In Progress</option>
                            <option value={TicketStatus.CLOSED}>Closed</option>
                        </select>
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
