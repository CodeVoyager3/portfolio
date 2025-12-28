"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sun, Moon, Search } from "lucide-react"
import { Avatar } from "@heroui/react"

export function NavigationMenuDemo() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }

  return (
    <nav className="navbar h-16 flex z-1">
      <div className="navbar-left">
        <Link href="/">
          <Avatar
            size="md"
            radius="full"
            src="https://github.com/CodeVoyager3.png"
            className="navbar-avatar"
          />
        </Link>
      </div>

      <div className="navbar-center">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link href="/projects" className="navbar-link">
              Projects
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/blogs" className="navbar-link">
              Blogs
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/research" className="navbar-link">
              Research
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  )
}
