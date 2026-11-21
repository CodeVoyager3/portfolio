import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        default: 'current',
    },
    fileName: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        default: 'application/pdf',
    },
    size: {
        type: Number,
        required: true,
    },
    data: {
        type: Buffer,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
