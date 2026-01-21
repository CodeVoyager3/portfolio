'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-950 px-4">
            <SignUp 
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "shadow-xl border border-zinc-200 dark:border-zinc-800",
                    },
                }}
                routing="path"
                path="/sign-up"
                signInUrl="/login"
                afterSignUpUrl="/admin"
            />
        </div>
    );
}
