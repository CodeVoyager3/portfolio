import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const dataDir = join(process.cwd(), 'data')

// Ensure data directory exists
mkdirSync(dataDir, { recursive: true })

// Initialize blogs.json with existing data
const blogs = [
  {
    title: "What is taste and how can you develop it?",
    description: "Understanding what is taste, resources and how to practice",
    image: "/blogs/taste.png",
    tags: ["Frontend", "Design"],
    date: "December 7, 2025",
    slug: "what-is-taste",
    category: "frontend"
  },
  {
    title: "Go in bits",
    description: "Archive of all the links from my socials for go tuts.",
    image: "/blogs/go-bits.png",
    tags: ["Go", "Development", "Backend"],
    date: "October 2, 2025",
    slug: "go-in-bits",
    category: "backend"
  },
  {
    title: "Building Scalable APIs with Node.js",
    description: "Best practices for building production-ready REST APIs",
    image: "/blogs/nodejs-api.png",
    tags: ["Node.js", "Backend", "API"],
    date: "September 15, 2025",
    slug: "scalable-apis-nodejs",
    category: "backend"
  },
  {
    title: "Modern CSS Techniques in 2025",
    description: "Exploring container queries, cascade layers, and more",
    image: "/blogs/modern-css.png",
    tags: ["CSS", "Frontend", "Design"],
    date: "August 22, 2025",
    slug: "modern-css-2025",
    category: "frontend"
  }
]

// Initialize research.json with existing data
const research = [
  {
    title: "Deep Learning for Medical Image Segmentation",
    description: "Exploring U-Net architectures and attention mechanisms for accurate tumor detection in MRI scans.",
    image: "/research/medical-ai.png",
    tags: ["Deep Learning", "Medical AI", "Computer Vision"],
    date: "November 15, 2025",
    slug: "medical-image-segmentation",
    category: "computer-vision"
  },
  {
    title: "Transformer Models for Code Generation",
    description: "Analyzing the effectiveness of fine-tuned LLMs for automated code completion and bug detection.",
    image: "/research/code-gen.png",
    tags: ["NLP", "LLM", "Code Generation"],
    date: "September 22, 2025",
    slug: "transformer-code-generation",
    category: "nlp"
  },
  {
    title: "Reinforcement Learning in Game AI",
    description: "Implementing deep Q-learning algorithms for autonomous game-playing agents.",
    image: "/research/game-ai.png",
    tags: ["Reinforcement Learning", "AI", "Gaming"],
    date: "August 10, 2025",
    slug: "rl-game-ai",
    category: "ai-ml"
  },
  {
    title: "Neural Style Transfer Applications",
    description: "Real-time artistic style transfer using convolutional neural networks for creative applications.",
    image: "/research/style-transfer.png",
    tags: ["Computer Vision", "CNN", "Art AI"],
    date: "July 5, 2025",
    slug: "neural-style-transfer",
    category: "computer-vision"
  }
]

// Initialize projects.json with existing data
const projects = [
  {
    title: "NotesBuddy",
    description: "A comprehensive study platform with notes, flashcards, quizzes, AI chatbot, and interactive learning tools",
    image: "/projects/notebuddy.png",
    technologies: ["nextjs2", "typescript", "tailwindcss", "react", "mongodb"],
    status: "operational",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Appwrite MCP Server",
    description: "Model Context Protocol server for seamless Appwrite database operations with 7 powerful tools and 99.9% success rate",
    image: "/projects/appwrite-mcp.png",
    technologies: ["typescript", "nodejs", "mongodb"],
    status: "operational",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Syncify",
    description: "Real-time music streaming platform with synchronized playback, live chat, and social listening features",
    image: "/projects/syncify.png",
    technologies: ["react", "nodejs", "tailwindcss", "mongodb"],
    status: "operational",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Pasandida Aurat",
    description: "Innovative dating platform featuring anonymous questions and authentic connections - currently in development",
    image: "/projects/pasandida.png",
    technologies: ["nextjs2", "typescript", "postgresql"],
    status: "building",
    liveUrl: "#",
    githubUrl: "#"
  }
]

// Write files
writeFileSync(join(dataDir, 'blogs.json'), JSON.stringify(blogs, null, 2))
writeFileSync(join(dataDir, 'research.json'), JSON.stringify(research, null, 2))
writeFileSync(join(dataDir, 'projects.json'), JSON.stringify(projects, null, 2))

console.log('✅ Data files initialized successfully!')
console.log('📁 Created files:')
console.log('   - data/blogs.json')
console.log('   - data/research.json')
console.log('   - data/projects.json')


