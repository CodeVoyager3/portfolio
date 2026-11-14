import mongoose from 'mongoose';

const GitHubProjectSchema = new mongoose.Schema({
    repoId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    url: {
        type: String,
        required: true,
    },
    homepage: {
        type: String,
        default: '',
    },
    language: {
        type: String,
        default: '',
    },
    topics: {
        type: [String],
        default: [],
    },
    stars: {
        type: Number,
        default: 0,
    },
    forks: {
        type: Number,
        default: 0,
    },
    isFork: {
        type: Boolean,
        default: false,
    },
    pinned: {
        type: Boolean,
        default: false,
    },
    published: {
        type: Boolean,
        default: false,
    },
    pushedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

export default mongoose.models.GitHubProject || mongoose.model('GitHubProject', GitHubProjectSchema);
