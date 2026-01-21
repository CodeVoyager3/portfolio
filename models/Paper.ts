import mongoose from 'mongoose';

const PaperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this paper.'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this paper.'],
    },
    pdfUrl: {
        type: String,
        required: [true, 'Please provide the PDF URL.'],
    },
    slug: {
        type: String,
        unique: true,
    },
    image: {
        type: String,
    },
    tags: {
        type: [String],
    },
    category: {
        type: String, // ai-ml, nlp, computer-vision
        default: 'ai-ml',
    },
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    featured: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Paper || mongoose.model('Paper', PaperSchema);
