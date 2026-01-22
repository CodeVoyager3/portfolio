export interface ProjectDocument {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    image?: string;
    thumbnail?: string;
    status: "building" | "operational" | "maintenance";
    liveUrl?: string; // mapped from demoLink
    demoLink?: string;
    githubUrl?: string; // mapped from githubLink
    githubLink?: string;
    publishedDate?: Date | string;
    createdAt: Date | string;
    featured?: boolean;
}

export interface BlogDocument {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    image?: string;
    category?: string;
    tags?: string[];
    published: boolean;
    featured: boolean;
    publishedDate?: Date | string;
    createdAt: Date | string;
}

export interface PaperDocument {
    _id: string;
    title: string;
    description: string;
    pdfUrl: string;
    slug?: string;
    image?: string;
    tags?: string[];
    category?: string;
    publishedDate?: Date | string;
    featured: boolean;
    createdAt: Date | string;
}

// UI Interfaces (transformed)
export interface Project {
    title: string;
    description: string;
    technologies: string[];
    image: string;
    status: "building" | "operational" | "maintenance";
    liveUrl?: string;
    githubUrl?: string;
    date: string;
}

export interface Blog {
    title: string;
    description: string;
    image: string;
    tags: string[];
    date: string;
    slug: string;
    category: string;
}

export interface Research {
    title: string;
    description: string;
    image: string;
    tags: string[];
    date: string;
    slug: string;
    category: string;
}
