import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, Wrench } from 'lucide-react';
import { CreatorLoginModal } from '../components/CreatorLoginModal';
import { SolverLoginModal } from '../components/SolverLoginModal';

export const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [showCreatorModal, setShowCreatorModal] = useState(false);
    const [showSolverModal, setShowSolverModal] = useState(false);

    const roles = [
        {
            title: 'Admin',
            description: 'Manage all tickets and system settings',
            icon: Users,
            path: '/admin',
            gradient: 'from-blue-600 to-cyan-600',
            hoverGradient: 'from-blue-500 to-cyan-500',
            requiresLogin: false,
        },
        {
            title: 'Creator',
            description: 'Create and submit new tickets',
            icon: UserPlus,
            path: '/creator',
            gradient: 'from-purple-600 to-pink-600',
            hoverGradient: 'from-purple-500 to-pink-500',
            requiresLogin: true,
            modalType: 'creator' as const,
        },
        {
            title: 'Solver',
            description: 'Resolve and manage assigned tickets',
            icon: Wrench,
            path: '/solver',
            gradient: 'from-emerald-600 to-teal-600',
            hoverGradient: 'from-emerald-500 to-teal-500',
            requiresLogin: true,
            modalType: 'solver' as const,
        },
    ];

    const handleRoleClick = (role: typeof roles[0]) => {
        if (role.requiresLogin) {
            if (role.modalType === 'creator') {
                setShowCreatorModal(true);
            } else if (role.modalType === 'solver') {
                setShowSolverModal(true);
            }
        } else {
            navigate(role.path);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
            <div className="max-w-6xl w-full">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Ticket Management System
                    </h1>
                    <p className="text-gray-400 text-xl">
                        Select your role to continue
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {roles.map((role) => {
                        const Icon = role.icon;
                        return (
                            <button
                                key={role.path}
                                onClick={() => handleRoleClick(role)}
                                className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all hover:shadow-2xl hover:shadow-black/50 hover:scale-105 transform duration-300"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                                <div className="relative">
                                    <div className={`w-16 h-16 mb-6 mx-auto bg-gradient-to-br ${role.gradient} rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:${role.hoverGradient} transition-all`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-3">
                                        {role.title}
                                    </h2>

                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                        {role.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <CreatorLoginModal
                isOpen={showCreatorModal}
                onClose={() => setShowCreatorModal(false)}
            />

            <SolverLoginModal
                isOpen={showSolverModal}
                onClose={() => setShowSolverModal(false)}
            />
        </div>
    );
};
