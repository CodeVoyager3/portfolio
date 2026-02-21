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
