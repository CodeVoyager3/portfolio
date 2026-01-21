'use client';

import { useState, useEffect } from "react"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { LayoutDashboard, FileText, FolderGit2, BookOpen, LogOut, Sun, Moon } from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { name: 'Research', href: '/admin/research', icon: BookOpen },
];

interface SidebarProps {
    className?: string; // Allow custom classes
    onClose?: () => void; // Callback to close sidebar on mobile
}

export function Sidebar({ className, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { signOut } = useClerk();
    const router = useRouter();
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            setIsDark(true)
            document.documentElement.classList.add("dark")
        }
    }, [])

    const toggleTheme = () => {
        setIsDark(!isDark)
        if (isDark) {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        } else {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        }
    }

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <div className={cn("flex h-full w-64 flex-col border-r border-border bg-card text-card-foreground", className)}>
            <div className="flex h-16 items-center justify-between px-6 border-b border-border">
                <span className="text-lg font-bold text-foreground">Admin Panel</span>
                <div className="flex items-center gap-2">
                    <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer" aria-label="Toggle theme">
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    {onClose && (
                        <button onClick={onClose} className="p-2 md:hidden rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer" aria-label="Close sidebar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    )}
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
                <nav className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose} // Close menu on navigation
                                className={cn(
                                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 cursor-pointer"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
