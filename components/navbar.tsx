'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import * as React from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

export function NavigationMenuDemo() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Hide navbar on admin routes
  if (pathname?.startsWith('/admin')) {
    return null
  }


  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
      {/* Left pill: Home + Nav links */}
      <div className="flex items-center gap-0.5 p-0.5 bg-black/5 dark:bg-white/10 rounded-full h-[36px] backdrop-blur-md">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-8 h-8 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 rounded-full flex items-center justify-center text-black/75 dark:text-white/80">
              <Link href="/">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 18 18" className="size-[14px]">
                  <path d="M13.75 6.019C13.336 6.019 13 5.683 13 5.269V2.75C13 2.336 13.336 2 13.75 2C14.164 2 14.5 2.336 14.5 2.75V5.269C14.5 5.683 14.164 6.019 13.75 6.019Z" fill="currentColor" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.792 5.848L9.446 1.147C9.181 0.951 8.818 0.951 8.553 1.147L2.208 5.848C1.764 6.177 1.5 6.702 1.5 7.254V13.75C1.5 15.267 2.733 16.5 4.25 16.5H5.5V12.75C5.5 11.7835 6.2835 11 7.25 11C8.2165 11 9 11.7835 9 12.75V16.5H13.75C15.267 16.5 16.5 15.267 16.5 13.75V7.254C16.5 6.702 16.235 6.176 15.792 5.848ZM11.25 10.5H12.75C13.164 10.5 13.5 10.164 13.5 9.75C13.5 9.336 13.164 9 12.75 9H11.25C10.836 9 10.5 9.336 10.5 9.75C10.5 10.164 10.836 10.5 11.25 10.5Z" fill="currentColor" />
                </svg>
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent>Home</TooltipContent>
        </Tooltip>


        {/* Nav links */}
        <NavLink href="/projects" label="Projects" pathname={pathname} />
        <NavLink href="/blogs" label="Blogs" pathname={pathname} />
        <NavLink href="/research" label="Research" pathname={pathname} />
      </div>

      {/* Right pill: Theme toggle */}
      <div className="flex items-center gap-0.5 p-0.5 bg-black/5 dark:bg-white/10 rounded-full h-[36px] backdrop-blur-md">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-8 h-8 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 rounded-full flex items-center justify-center text-black/75 dark:text-white/80">
              <button
                onClick={() => {
                  const newTheme = theme === 'light' ? 'dark' : 'light'
                  if (typeof document !== "undefined" && "startViewTransition" in document) {
                    ; (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
                      setTheme(newTheme)
                    })
                  } else {
                    setTheme(newTheme)
                  }
                }}
                className="w-full h-full flex items-center justify-center"
                aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              >
                {theme === 'light' ? (
                  <Moon className="size-[14px]" aria-hidden="true" />
                ) : (
                  <Sun className="size-[14px]" aria-hidden="true" />
                )}
              </button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          </TooltipContent>
        </Tooltip>
      </div>
    </nav>
  )
}

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string | null }) {
  const isActive = pathname === href

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${isActive
            ? 'bg-black/10 dark:bg-white/20 text-black dark:text-white'
            : 'text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80 hover:bg-black/5 dark:hover:bg-white/10'
            }`}
        >
          {label}
        </Link>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
