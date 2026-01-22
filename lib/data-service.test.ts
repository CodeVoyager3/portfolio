import { describe, it, expect, vi } from 'vitest'
import { DataService } from '@/lib/data-service'
import ProjectModel from '@/models/Project'

// Mock Mongoose models
vi.mock('@/lib/db', () => ({
    default: vi.fn(),
}))

vi.mock('@/models/Project', () => ({
    default: {
        find: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn(),
    },
}))

vi.mock('@/models/Blog', () => ({
    default: {
        find: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn(),
    },
}))

vi.mock('@/models/Paper', () => ({
    default: {
        find: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn(),
    },
}))

describe('DataService', () => {
    it('should transform projects correctly', async () => {
        const mockProjects = [
            {
                title: 'Test Project',
                description: 'Desc',
                techStack: ['React'],
                thumbnail: '/img.png',
                status: 'building',
                demoLink: 'https://demo.com',
                githubLink: 'https://github.com',
                publishedDate: new Date('2024-01-01'),
            },
        ]

        // @ts-ignore
        ProjectModel.find().sort().limit().lean.mockResolvedValue(mockProjects)

        const result = await DataService.getFeaturedProjects()

        expect(result).toHaveLength(1)
        expect(result[0].title).toBe('Test Project')
        expect(result[0].date).toBe('January 1, 2024')
        expect(result[0].image).toBe('/img.png')
    })

    it('should handle empty projects gracefully', async () => {
        // @ts-ignore
        ProjectModel.find().sort().limit().lean.mockResolvedValue([])

        const result = await DataService.getFeaturedProjects()
        expect(result).toHaveLength(0)
    })

    it('should handle database errors gracefully', async () => {
        // @ts-ignore
        ProjectModel.find().sort().limit().lean.mockRejectedValue(new Error('DB Error'))

        const result = await DataService.getFeaturedProjects()
        expect(result).toHaveLength(0) // Should catch error and return empty array
    })
})
