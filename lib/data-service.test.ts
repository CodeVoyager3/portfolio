import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DataService } from '@/lib/data-service'
import GitHubProjectModel from '@/models/GitHubProject'

const { mockFind, mockSort, mockLean, mockCount } = vi.hoisted(() => ({
    mockFind: vi.fn(),
    mockSort: vi.fn(),
    mockLean: vi.fn(),
    mockCount: vi.fn(),
}))

vi.mock('@/lib/db', () => ({
    default: vi.fn(),
}))

vi.mock('@/models/GitHubProject', () => ({
    default: {
        find: mockFind,
        countDocuments: mockCount,
    },
}))

function mockFindResult(rows: any[]) {
    mockFind.mockReturnValue({ sort: mockSort, lean: mockLean })
    mockSort.mockReturnValue({ lean: mockLean })
    mockLean.mockResolvedValue(rows)
}

describe('DataService', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    const makeDoc = (overrides: Record<string, any> = {}) => ({
        repoId: 1,
        name: 'test-repo',
        fullName: 'user/test-repo',
        description: 'A test repo',
        url: 'https://github.com/user/test-repo',
        homepage: '',
        language: 'TypeScript',
        topics: ['react'],
        stars: 10,
        forks: 2,
        isFork: false,
        pinned: false,
        published: true,
        pushedAt: new Date('2024-01-01'),
        ...overrides,
    })

    it('should map published projects to UI shape', async () => {
        mockFindResult([makeDoc()])
        const projects = await DataService.getPublishedProjects()

        expect(projects).toHaveLength(1)
        expect(projects[0]).toMatchObject({
            repoId: 1,
            name: 'test-repo',
            fullName: 'user/test-repo',
            description: 'A test repo',
            url: 'https://github.com/user/test-repo',
            language: 'TypeScript',
            topics: ['react'],
            stars: 10,
            forks: 2,
            pinned: false,
            published: true,
        })
        expect(projects[0].pushedAt).toBe(new Date('2024-01-01').toISOString())
        expect(mockFind).toHaveBeenCalledWith({ published: true })
    })

    it('should return pinned repos first in featured projects', async () => {
        const pinned = makeDoc({ repoId: 2, pinned: true, stars: 5 })
        const other = makeDoc({ repoId: 1, pinned: false, stars: 50 })
        mockFind.mockReturnValue({ sort: mockSort, lean: mockLean })
        mockSort.mockReturnValue({ lean: mockLean })
        mockLean.mockResolvedValueOnce([pinned]).mockResolvedValueOnce([other])

        const projects = await DataService.getFeaturedProjects()

        expect(projects.map((p) => p.repoId)).toEqual([2, 1])
    })

    it('should respect the featured limit', async () => {
        mockFindResult([makeDoc({ repoId: 1 }), makeDoc({ repoId: 2 }), makeDoc({ repoId: 3 })])
        const projects = await DataService.getFeaturedProjects(2)
        expect(projects).toHaveLength(2)
    })

    it('should return stats from countDocuments', async () => {
        mockCount.mockResolvedValueOnce(3).mockResolvedValueOnce(1).mockResolvedValueOnce(5)
        const stats = await DataService.getStats()
        expect(stats).toEqual({ published: 3, pinned: 1, total: 5 })
    })

    it('should return empty arrays when the model throws', async () => {
        mockLean.mockRejectedValue(new Error('db down'))
        const projects = await DataService.getPublishedProjects()
        expect(projects).toEqual([])
    })
})
