export interface Project {
    title: string
    description: string
    image: string
    technologies: string[]
    status: "operational" | "building" | "maintenance"
    liveUrl?: string
    githubUrl?: string
}

export const projects: Project[] = [
    {
        title: "NotesBuddy",
        description: "A comprehensive study platform with notes, flashcards, quizzes, AI chatbot, and interactive learning tools",
        image: "/projects/notebuddy.png",
        technologies: ["nextjs2", "typescript", "tailwindcss", "reactjs", "mongodb"],
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
        technologies: ["reactjs", "nodejs", "tailwindcss", "mongodb"],
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
