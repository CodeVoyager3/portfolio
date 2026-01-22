
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect('/login');
    }

    const user = await currentUser();
    const adminEmail = process.env.ADMIN_EMAIL || 'amriteshkumarrai14@gmail.com';

    // Check if the user's email matches the allowed email
    if (!user || !adminEmail || user.emailAddresses[0]?.emailAddress !== adminEmail) {
        redirect('/');
    }

    return (
        <AdminLayoutClient>
            {children}
        </AdminLayoutClient>
    );
}
