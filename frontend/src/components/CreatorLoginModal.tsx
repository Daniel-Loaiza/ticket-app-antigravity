import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface CreatorLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreatorLoginModal: React.FC<CreatorLoginModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [creatorId, setCreatorId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (creatorId) {
            navigate(`/creator?creatorId=${creatorId}`);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                            Creator Login
                        </h2>
                        <p className="text-gray-400">
                            Enter your Creator ID to access the tickets you created
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
                            Creator ID
                        </label>
                        <input
                            type="number"
                            required
                            value={creatorId}
                            onChange={(e) => setCreatorId(e.target.value)}
                            placeholder="e.g., 1"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    >
                        Access the Creator Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};
