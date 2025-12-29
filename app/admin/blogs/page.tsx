"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { BlurFade } from "../../components/motion/animated-group"

interface Blog {
  title: string
  description: string
  image: string
  tags: string[]
  date: string
  slug: string
  category: "frontend" | "backend" | "devops" | "all"
  content?: string
}

export default function AdminBlogs() {
  const searchParams = useSearchParams()
  const action = searchParams.get("action")
  const editSlug = searchParams.get("edit")

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(action === "create" || !!editSlug)
  const [formData, setFormData] = useState<Blog>({
    title: "",
    description: "",
    image: "",
    tags: [],
    date: "",
    slug: "",
    category: "frontend",
    content: "",
  })
  const [tagInput, setTagInput] = useState("")

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    if (editSlug) {
      const blog = blogs.find(b => b.slug === editSlug)
      if (blog) {
        setFormData(blog)
        setShowForm(true)
      }
    }
  }, [editSlug, blogs])

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs")
      const data = await res.json()
      setBlogs(data)
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editSlug ? "PUT" : "POST"
      const res = await fetch("/api/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        await fetchBlogs()
        setShowForm(false)
        setFormData({
          title: "",
          description: "",
          image: "",
          tags: [],
          date: "",
          slug: "",
          category: "frontend",
          content: "",
        })
        window.history.replaceState({}, "", "/admin/blogs")
      }
    } catch (error) {
      console.error("Failed to save blog:", error)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return

    try {
      const res = await fetch("/api/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })

      if (res.ok) {
        await fetchBlogs()
      }
    } catch (error) {
      console.error("Failed to delete blog:", error)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      })
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    })
  }

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  return (
    <div className="admin-content">
      <BlurFade delay={0}>
        <div className="admin-page-header">
          <h1 className="admin-page-title">Manage Blogs</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="admin-create-button"
            >
              + New Blog
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
                <label className="admin-form-label">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="admin-form-input"
                  required
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="devops">DevOps</option>
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
              <div className="admin-form-group">
                <label className="admin-form-label">Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="admin-form-input"
                  placeholder="e.g., December 7, 2025"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Tags</label>
              <div className="admin-tag-input">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                  className="admin-form-input"
                  placeholder="Press Enter to add tag"
                />
                <button type="button" onClick={addTag} className="admin-tag-add-button">
                  Add
                </button>
              </div>
              <div className="admin-tags-list">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="admin-tag">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="admin-tag-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Content (Markdown)</label>
              <textarea
                value={formData.content || ""}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="admin-form-textarea"
                rows={10}
              />
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-submit-button">
                {editSlug ? "Update" : "Create"} Blog
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setFormData({
                    title: "",
                    description: "",
                    image: "",
                    tags: [],
                    date: "",
                    slug: "",
                    category: "frontend",
                    content: "",
                  })
                  window.history.replaceState({}, "", "/admin/blogs")
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
            {blogs.length === 0 ? (
              <div className="admin-empty-state">No blogs found. Create your first blog!</div>
            ) : (
              blogs.map((blog, index) => (
                <BlurFade key={blog.slug} delay={0.1 + index * 0.05}>
                  <div className="admin-list-item">
                    <div className="admin-list-item-content">
                      <h3 className="admin-list-item-title">{blog.title}</h3>
                      <p className="admin-list-item-description">{blog.description}</p>
                      <div className="admin-list-item-meta">
                        <span className="admin-list-item-badge">{blog.category}</span>
                        <span className="admin-list-item-date">{blog.date}</span>
                      </div>
                    </div>
                    <div className="admin-list-item-actions">
                      <a
                        href={`/admin/blogs?edit=${blog.slug}`}
                        className="admin-edit-button"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => handleDelete(blog.slug)}
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

