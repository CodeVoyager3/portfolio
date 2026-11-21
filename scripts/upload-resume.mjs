// Seeds the resume PDF into MongoDB. Usage:
//   node --env-file=.env.local scripts/upload-resume.mjs "path/to/resume.pdf"
import mongoose from 'mongoose';
import fs from 'node:fs';
import path from 'node:path';

const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: node --env-file=.env.local scripts/upload-resume.mjs "path/to/resume.pdf"');
    process.exit(1);
}

const fileName = path.basename(filePath);
const data = fs.readFileSync(filePath);

const ResumeSchema = new mongoose.Schema(
    {
        key: { type: String, required: true, unique: true, default: 'current' },
        fileName: { type: String, required: true },
        contentType: { type: String, default: 'application/pdf' },
        size: { type: Number, required: true },
        data: { type: Buffer, required: true },
    },
    { timestamps: true },
);

await mongoose.connect(process.env.MONGODB_URI);
const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);

const doc = await Resume.findOneAndUpdate(
    { key: 'current' },
    { fileName, contentType: 'application/pdf', size: data.length, data },
    { upsert: true, new: true },
);

console.log(`Resume uploaded: ${doc.fileName} (${(doc.size / 1024).toFixed(0)} KB)`);
await mongoose.disconnect();
