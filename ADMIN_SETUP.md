# Admin Panel Setup Guide

This guide will help you set up the admin panel for managing your portfolio content.

## Prerequisites

- Node.js installed
- The project dependencies installed (`npm install`)

## Setup Steps

### 1. Create Environment Variables

Create a `.env.local` file in the root directory with the following content:

```env
ADMIN_USERNAME=your_username_here
ADMIN_PASSWORD=your_secure_password_here
```

**Important:** Replace `your_username_here` and `your_secure_password_here` with your desired admin credentials.

### 2. Initialize Data Files

Run the initialization script to create the data files with your existing content:

```bash
npm run init-data
```

This will create:
- `data/blogs.json` - Blog posts
- `data/research.json` - Research papers
- `data/projects.json` - Projects

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Access the Admin Panel

Navigate to: `http://localhost:3000/admin/login`

Use the credentials you set in `.env.local` to log in.

## Admin Panel Features

### Dashboard
- View statistics for blogs, research papers, and projects
- Quick access to create new content

### Blogs Management
- Create, edit, and delete blog posts
- Set categories (Frontend, Backend, DevOps)
- Add tags and images
- Include markdown content

### Research Papers Management
- Create, edit, and delete research papers
- Set categories (AI/ML, NLP, Computer Vision)
- Add tags and images
- Include markdown content

### Projects Management
- Create, edit, and delete projects
- Set status (Operational, Building, Maintenance)
- Add technologies, live URLs, and GitHub URLs
- Include project images

## Data Storage

All content is stored in JSON files in the `data/` directory:
- `data/blogs.json`
- `data/research.json`
- `data/projects.json`

These files are automatically created and updated when you use the admin panel.

## Security Notes

- The admin credentials are stored in environment variables (`.env.local`)
- Never commit `.env.local` to version control
- The admin session uses HTTP-only cookies
- In production, ensure your `.env.local` file is secure

## Troubleshooting

### Cannot access admin panel
- Make sure you've created `.env.local` with `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- Restart the development server after creating `.env.local`

### Data not showing
- Run `npm run init-data` to initialize the data files
- Check that the `data/` directory exists and contains JSON files

### API errors
- Ensure the `data/` directory is writable
- Check that JSON files are valid JSON format

## Production Deployment

For production:
1. Set environment variables in your hosting platform
2. Ensure the `data/` directory is writable
3. Consider backing up your data files regularly
4. Use secure, strong passwords for admin credentials

