import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface SolverLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SolverLoginModal: React.FC<SolverLoginModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [solverId, setSolverId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (solverId) {
            navigate(`/solver?solverId=${solverId}`);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-2">
                            Solver Login
                        </h2>
                        <p className="text-gray-400">
                            Enter your Solver ID to access the tickets that have been assigned to you
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Solver ID
                        </label>
                        <input
                            type="number"
                            required
                            value={solverId}
                            onChange={(e) => setSolverId(e.target.value)}
                            placeholder="e.g., 2"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    >
                        Access the Solver Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};
