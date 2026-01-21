
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import User from '../models/User';

// Manually load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    console.log('Loading .env.local...');
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        // Skip comments and empty lines
        if (!line || line.startsWith('#')) return;

        // Split on the first equals sign
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            process.env[key] = value;
        }
    });
} else {
    console.warn('.env.local not found!');
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI not found in environment variables.');
    process.exit(1);
}

async function initUser() {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(MONGODB_URI!);
            console.log('Connected to database.');
        }

        const email = 'Amritesh@123';
        const password = 'password123'; // Default password

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log(`User '${email}' already exists.`);
            // Update password just in case it's wrong/forgotten
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUser.password = hashedPassword;
            await existingUser.save();
            console.log(`Updated password for '${email}' to '${password}'.`);
        } else {
            console.log(`User '${email}' not found. Creating...`);
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                email,
                password: hashedPassword,
                name: 'Amritesh Admin'
            });
            console.log(`Created user '${email}' with password '${password}'.`);
        }

    } catch (error) {
        console.error('Error initializing user:', error);
    } finally {
        await mongoose.disconnect();
    }
}

initUser();
