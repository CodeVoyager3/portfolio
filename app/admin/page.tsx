"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BlurFade } from "../components/motion/animated-group"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    research: 0,
    projects: 0,
  })

  useEffect(() => {
    Promise.all([
      fetch("/api/blogs").then(res => res.json()),
      fetch("/api/research").then(res => res.json()),
      fetch("/api/projects").then(res => res.json()),
    ]).then(([blogs, research, projects]) => {
      setStats({
        blogs: blogs.length,
        research: research.length,
        projects: projects.length,
      })
    })
  }, [])

  return (
    <div className="admin-dashboard">
      <BlurFade delay={0}>
        <div className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">Admin Dashboard</h1>
          <p className="admin-dashboard-subtitle">Manage your portfolio content</p>
        </div>
      </BlurFade>

      <div className="admin-stats-grid">
        <BlurFade delay={0.1}>
          <Link href="/admin/blogs" className="admin-stat-card">
            <div className="admin-stat-icon">📝</div>
            <div className="admin-stat-content">
              <h3 className="admin-stat-title">Blogs</h3>
              <p className="admin-stat-value">{stats.blogs}</p>
            </div>
          </Link>
        </BlurFade>

        <BlurFade delay={0.15}>
          <Link href="/admin/research" className="admin-stat-card">
            <div className="admin-stat-icon">🔬</div>
            <div className="admin-stat-content">
              <h3 className="admin-stat-title">Research Papers</h3>
              <p className="admin-stat-value">{stats.research}</p>
            </div>
          </Link>
        </BlurFade>

        <BlurFade delay={0.2}>
          <Link href="/admin/projects" className="admin-stat-card">
            <div className="admin-stat-icon">🚀</div>
            <div className="admin-stat-content">
              <h3 className="admin-stat-title">Projects</h3>
              <p className="admin-stat-value">{stats.projects}</p>
            </div>
          </Link>
        </BlurFade>
      </div>

      <BlurFade delay={0.25}>
        <div className="admin-quick-actions">
          <h2 className="admin-section-title">Quick Actions</h2>
          <div className="admin-actions-grid">
            <Link href="/admin/blogs?action=create" className="admin-action-button">
              + New Blog Post
            </Link>
            <Link href="/admin/research?action=create" className="admin-action-button">
              + New Research Paper
            </Link>
            <Link href="/admin/projects?action=create" className="admin-action-button">
              + New Project
            </Link>
          </div>
        </div>
      </BlurFade>
    </div>
  )
}

