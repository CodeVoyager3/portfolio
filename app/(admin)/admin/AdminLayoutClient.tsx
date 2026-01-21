'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Menu } from 'lucide-react';

export default function AdminLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Desktop Sidebar - hidden on mobile */}
            <Sidebar className="hidden md:flex" />

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />

                    {/* Sidebar */}
                    <Sidebar
                        className="relative w-64 h-full border-r border-border bg-card shadow-xl z-50"
                        onClose={() => setIsSidebarOpen(false)}
                    />
                </div>
            )}

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
                    <span className="font-bold text-lg">Admin Panel</span>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -mr-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
