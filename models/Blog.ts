import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this blog post.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
        type: String,
        required: [true, 'Please provide a slug for this blog post.'],
        unique: true,
    },
    content: {
        type: String,
        required: [true, 'Please provide content for this blog post.'],
    },
    excerpt: {
        type: String,
        maxlength: [200, 'Excerpt cannot be more than 200 characters'],
    },
    tags: {
        type: [String],
    },
    image: {
        type: String, // URL for cover image
    },
    category: {
        type: String, // frontend, backend, devops, etc.
        default: 'frontend',
    },
    published: {
        type: Boolean,
        default: false,
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

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
