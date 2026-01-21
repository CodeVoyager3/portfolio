import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this project.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this project.'],
    },
    techStack: {
        type: [String],
        required: [true, 'Please provide at least one technology.'],
    },
    githubLink: {
        type: String,
    },
    demoLink: {
        type: String,
    },
    videoUrl: {
        type: String, // YouTube URL or Cloudinary URL
    },
    thumbnail: {
        type: String, // Cloudinary URL
    },
    status: {
        type: String,
        default: 'building',
    },
    featured: {
        type: Boolean,
        default: false,
    },
    publishedDate: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
