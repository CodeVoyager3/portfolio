import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import AdminLayoutClient from './AdminLayoutClient';

const ALLOWED_EMAIL = 'amriteshkumarrai14@gmail.com';

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

    // Check if the user's email matches the allowed email
    if (!user || user.emailAddresses[0]?.emailAddress !== ALLOWED_EMAIL) {
        redirect('/');
    }

    return (
        <AdminLayoutClient>
            {children}
        </AdminLayoutClient>
    );
}
