import mongoose from 'mongoose';
import User from '../models/User';
import dbConnect from '../lib/db';
import bcrypt from 'bcryptjs';

const createAdmin = async () => {
    const args = process.argv.slice(2);
    const email = args[0];
    const password = args[1];

    if (!email || !password) {
        console.error('Usage: tsx scripts/create-admin.ts <email> <password>');
        process.exit(1);
    }

    try {
        // We need to set the MONGODB_URI in the process.env if running directly, 
        // but usually dotenv takes care of it. 
        // If not, it assumes .env is loaded.
        // For now, let's assume the user runs this with dotenv-cli or similar if env vars aren't picked up automatically.
        // Actually, Next.js scripts might not pick up .env.local automatically if not run via `next`.
        // But `tsx` supports dotenv via `dotenv/config`. 
        // For now, I'll add basic env loading attempt if it's missing, but simpler to rely on user environment.

        // Actually, let's just use dbConnect which relies on process.env.MONGODB_URI.
        if (!process.env.MONGODB_URI) {
            console.log('Ensure MONGODB_URI is set in your environment.');
        }

        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists.');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            password: hashedPassword,
            name: 'Admin',
        });

        console.log(`Admin user ${email} created successfully.`);
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
