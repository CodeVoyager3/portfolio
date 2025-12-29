"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setLoading(false)
      return
    }

    fetch("/api/auth/check")
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setAuthenticated(true)
        } else {
          router.push("/admin/login")
        }
        setLoading(false)
      })
      .catch(() => {
        router.push("/admin/login")
        setLoading(false)
      })
  }, [router, pathname])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
  }

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="admin-loading">Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <nav className="admin-navbar">
        <div className="admin-navbar-content">
          <Link href="/admin" className="admin-navbar-brand">
            Admin Dashboard
          </Link>
          <div className="admin-navbar-links">
            <Link
              href="/admin"
              className={`admin-navbar-link ${pathname === "/admin" ? "active" : ""}`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/blogs"
              className={`admin-navbar-link ${pathname === "/admin/blogs" ? "active" : ""}`}
            >
              Blogs
            </Link>
            <Link
              href="/admin/research"
              className={`admin-navbar-link ${pathname === "/admin/research" ? "active" : ""}`}
            >
              Research
            </Link>
            <Link
              href="/admin/projects"
              className={`admin-navbar-link ${pathname === "/admin/projects" ? "active" : ""}`}
            >
              Projects
            </Link>
            <button onClick={handleLogout} className="admin-navbar-logout">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}

