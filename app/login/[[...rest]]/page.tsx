'use client';

import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <SignIn
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "shadow-xl border border-border bg-card",
                    },
                }}
                routing="path"
                path="/login"
                signUpUrl="/sign-up"
                forceRedirectUrl="/admin"
            />
        </div>
    );
}
