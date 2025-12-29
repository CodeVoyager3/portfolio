"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { BlurFade } from "../../components/motion/animated-group"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  status: "operational" | "building" | "maintenance"
  liveUrl?: string
  githubUrl?: string
}

export default function AdminProjects() {
  const searchParams = useSearchParams()
  const action = searchParams.get("action")
  const editTitle = searchParams.get("edit")

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(action === "create" || !!editTitle)
  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    image: "",
    technologies: [],
    status: "operational",
    liveUrl: "",
    githubUrl: "",
  })
  const [techInput, setTechInput] = useState("")

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (editTitle) {
      const project = projects.find(p => p.title === editTitle)
      if (project) {
        setFormData(project)
        setShowForm(true)
      }
    }
  }, [editTitle, projects])

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects")
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editTitle ? "PUT" : "POST"
      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        await fetchProjects()
        setShowForm(false)
        setFormData({
          title: "",
          description: "",
          image: "",
          technologies: [],
          status: "operational",
          liveUrl: "",
          githubUrl: "",
        })
        window.history.replaceState({}, "", "/admin/projects")
      }
    } catch (error) {
      console.error("Failed to save project:", error)
    }
  }

  const handleDelete = async (title: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })

      if (res.ok) {
        await fetchProjects()
      }
    } catch (error) {
      console.error("Failed to delete project:", error)
    }
  }

  const addTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      })
      setTechInput("")
    }
  }

  const removeTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech),
    })
  }

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  return (
    <div className="admin-content">
      <BlurFade delay={0}>
        <div className="admin-page-header">
          <h1 className="admin-page-title">Manage Projects</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="admin-create-button"
            >
              + New Project
            </button>
          )}
        </div>
      </BlurFade>

      {showForm && (
        <BlurFade delay={0.1}>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="admin-form-input"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="admin-form-input"
                  required
                >
                  <option value="operational">Operational</option>
                  <option value="building">Building</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="admin-form-textarea"
                rows={3}
                required
              />
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="admin-form-input"
                  required
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Live URL</label>
                <input
                  type="text"
                  value={formData.liveUrl || ""}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="admin-form-input"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">GitHub URL</label>
                <input
                  type="text"
                  value={formData.githubUrl || ""}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="admin-form-input"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Technologies</label>
              <div className="admin-tag-input">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTech()
                    }
                  }}
                  className="admin-form-input"
                  placeholder="Press Enter to add technology"
                />
                <button type="button" onClick={addTech} className="admin-tag-add-button">
                  Add
                </button>
              </div>
              <div className="admin-tags-list">
                {formData.technologies.map((tech, index) => (
                  <span key={index} className="admin-tag">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="admin-tag-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-submit-button">
                {editTitle ? "Update" : "Create"} Project
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setFormData({
                    title: "",
                    description: "",
                    image: "",
                    technologies: [],
                    status: "operational",
                    liveUrl: "",
                    githubUrl: "",
                  })
                  window.history.replaceState({}, "", "/admin/projects")
                }}
                className="admin-cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </BlurFade>
      )}

      {!showForm && (
        <BlurFade delay={0.1}>
          <div className="admin-list">
            {projects.length === 0 ? (
              <div className="admin-empty-state">No projects found. Create your first project!</div>
            ) : (
              projects.map((project, index) => (
                <BlurFade key={project.title} delay={0.1 + index * 0.05}>
                  <div className="admin-list-item">
                    <div className="admin-list-item-content">
                      <h3 className="admin-list-item-title">{project.title}</h3>
                      <p className="admin-list-item-description">{project.description}</p>
                      <div className="admin-list-item-meta">
                        <span className="admin-list-item-badge">{project.status}</span>
                        <span className="admin-list-item-tech">
                          {project.technologies.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="admin-list-item-actions">
                      <a
                        href={`/admin/projects?edit=${encodeURIComponent(project.title)}`}
                        className="admin-edit-button"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => handleDelete(project.title)}
                        className="admin-delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </BlurFade>
              ))
            )}
          </div>
        </BlurFade>
      )}
    </div>
  )
}

