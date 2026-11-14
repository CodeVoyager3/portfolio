import { auth, currentUser } from '@clerk/nextjs/server';

export async function isAdminUser(): Promise<boolean> {
    const { userId } = await auth();
    if (!userId) return false;
    const user = await currentUser();
    const adminEmail = process.env.ADMIN_EMAIL;
    return !!user && !!adminEmail && user.emailAddresses[0]?.emailAddress === adminEmail;
}
