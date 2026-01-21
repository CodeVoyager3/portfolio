
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email for this user.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password for this user.'],
    },
    name: {
        type: String,
    },
}, {
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function checkAndSeedUser() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to database.');

        const email = 'Amritesh@123';
        const password = 'password123'; // Or whatever the user intends to use, I'll ask or set a default
        // Actually, the log showed "Attempting login for: Amritesh@123", which looks like a username/email.
        // But the schema expects an email format usually. However, the schema says type: String, so it's fine.
        // Wait, the log says 'Amritesh@123'. Is that the email or the password?
        // "Attempting login for: Amritesh@123" comes from `console.log('Attempting login for:', credentials.email);`
        // So the user entered 'Amritesh@123' as the email.

        const user = await User.findOne({ email: email });

        if (user) {
            console.log(`User '${email}' found.`);
            // Optional: Reset password if needed
        } else {
            console.log(`User '${email}' not found. Creating...`);
            // Hash the password - assuming a default one for now or I can ask the user.
            // But usually for admin setup, we might want a specific one.
            // Let's create it with a temporary password 'admin123' and print it.
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                email: email,
                password: hashedPassword,
                name: 'Amritesh User'
            });
            console.log(`User '${email}' created with password 'admin123'.`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkAndSeedUser();
