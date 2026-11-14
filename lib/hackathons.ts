export interface HackathonWin {
  id: string
  hackathon: string
  organizer?: string
  prize?: string
  /** ISO date of the LinkedIn post */
  date?: string
  headline: string
  /** LinkedIn post URL */
  url: string
  repost?: boolean
}

export const hackathonWins: HackathonWin[] = [
  {
    id: "codeveda",
    hackathon: "Code Veda 2.0",
    organizer: "ThoughtWorks · Gurugram",
    prize: "3rd Place",
    date: "2026-04-14",
    headline: "Back-to-back wins… and this time, we secured 3rd Place 🏆🔥",
    url: "https://www.linkedin.com/posts/amritesh-dev_hackathon-codeveda-adgips-activity-7449869015495368705-3TH-",
  },
  {
    id: "protex",
    hackathon: "ProTeX",
    organizer: "IGDTUW · Microsoft",
    date: "2026-04-07",
    headline: "What an incredible experience!",
    url: "https://www.linkedin.com/posts/amritesh-dev_hackathon-protex-igdtuw-activity-7447341931199868928-ybX0",
  },
  {
    id: "duality",
    hackathon: "Duality Hackathon",
    organizer: "Genesis × Duality AI · Google for Developers",
    prize: "1st Position",
    date: "2026-01-08",
    headline:
      "Thrilled to announce that our team clinched 1st position 🥇 at the Duality Hackathon organized by Genesis, in collaboration with Duality AI and supported by Google for Developers!",
    url: "https://www.linkedin.com/posts/amritesh-dev_activity-7415076756770095104-9nYJ",
  },
  {
    id: "fossforge",
    hackathon: "FOSS Forge",
    organizer: "Elysian 2025 · GGSIPU",
    date: "2025-10-17",
    headline: 'git commit -m "We did it!" 🔥',
    url: "https://www.linkedin.com/posts/amritesh-dev_git-opensource-foss-activity-7385023711612968960-YEmm",
  },
  {
    id: "repost-3x",
    hackathon: "3x Hackathon Winner",
    organizer: "Reposted from Nishchay Saluja",
    headline: "Shared on LinkedIn",
    url: "https://www.linkedin.com/posts/amritesh-dev_activity-7398742237108559872-4BmY",
    repost: true,
  },
]
