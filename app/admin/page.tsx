"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Save, Edit2, X, LogOut, Loader2, Search } from "lucide-react"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { iconLibrary, getAvailableIcons, popularIcons } from "@/lib/icon-library"

interface Skill {
  name: string
  icon?: string
}

interface SkillCategory {
  id: string
  label: string
  skills: Skill[]
}

function SkillRow({
  skill,
  categoryId,
  skillIndex,
  onUpdate,
  onRemove,
}: {
  skill: Skill
  categoryId: string
  skillIndex: number
  onUpdate: (updates: Partial<Skill>) => void
  onRemove: () => void
}) {
  const [iconSearch, setIconSearch] = useState("")
  const [iconPopoverOpen, setIconPopoverOpen] = useState(false)
  const IconComponent = skill.icon ? iconLibrary[skill.icon] : null
  const availableIcons = getAvailableIcons()
  const filteredIcons = iconSearch
    ? availableIcons.filter((icon) =>
        icon.toLowerCase().includes(iconSearch.toLowerCase())
      )
    : availableIcons

  return (
    <div className="flex gap-2 items-center">
      <Input
        value={skill.name}
        onChange={(e) => onUpdate({ name: e.target.value })}
        placeholder="Skill name"
        className="bg-black/50 border-white/10 flex-1"
      />
      <Popover open={iconPopoverOpen} onOpenChange={setIconPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
          >
            {IconComponent ? (
              <IconComponent className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-black/95 border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search icons..."
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
                className="bg-black/50 border-white/10 h-8"
              />
            </div>
            <div className="max-h-64 overflow-y-auto grid grid-cols-6 gap-2">
              {filteredIcons.map((iconName) => {
                const Icon = iconLibrary[iconName]
                return (
                  <button
                    key={iconName}
                    onClick={() => {
                      onUpdate({ icon: iconName })
                      setIconPopoverOpen(false)
                    }}
                    className={`p-2 rounded border transition-colors ${
                      skill.icon === iconName
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10"
                    }`}
                    title={iconName}
                  >
                    {Icon && <Icon className="h-4 w-4 text-blue-400" />}
                  </button>
                )
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Button
        variant="outline"
        size="icon"
        onClick={onRemove}
        className="border-red-500/50 text-red-400 hover:bg-red-500/20"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

interface Project {
  id: string
  title: string
  description: string
  image: string
  imageFit: "contain" | "cover"
  imageBg: string
  technologies: string[]
  demoLink: string
  codeLink: string
}

export default function AdminPage() {
  const router = useRouter()
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null)
  const [newTech, setNewTech] = useState("")

  // Project form state
  const [projectForm, setProjectForm] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    image: "",
    imageFit: "contain",
    imageBg: "",
    technologies: [],
    demoLink: "",
    codeLink: "",
  })

  useEffect(() => {
    // Check authentication first
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")
        if (response.ok) {
          const data = await response.json()
          if (data.authenticated) {
            setAuthenticated(true)
            loadData()
          } else {
            router.push("/admin/login")
          }
        } else {
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/admin/login")
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      toast.success("Logged out successfully")
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Logout failed")
    }
  }

  const loadData = async () => {
    try {
      setLoading(true)
      const [skillsRes, projectsRes] = await Promise.all([
        fetch("/api/skills"),
        fetch("/api/projects"),
      ])

      if (skillsRes.ok) {
        const skillsData = await skillsRes.json()
        setSkillCategories(skillsData.categories || [])
      }

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(projectsData || [])
      }
    } catch (error) {
      toast.error("Failed to load data")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const saveSkills = async () => {
    try {
      setSaving(true)
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: skillCategories }),
      })

      if (response.ok) {
        toast.success("Skills saved successfully!")
      } else {
        toast.error("Failed to save skills")
      }
    } catch (error) {
      toast.error("Failed to save skills")
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const saveProjects = async () => {
    try {
      setSaving(true)
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projects),
      })

      if (response.ok) {
        toast.success("Projects saved successfully!")
      } else {
        toast.error("Failed to save projects")
      }
    } catch (error) {
      toast.error("Failed to save projects")
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const addSkillToCategory = (categoryId: string) => {
    setSkillCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, skills: [...cat.skills, { name: "", icon: "Code2" }] }
          : cat
      )
    )
  }

  const updateSkill = (categoryId: string, skillIndex: number, updates: Partial<Skill>) => {
    setSkillCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              skills: cat.skills.map((skill, idx) =>
                idx === skillIndex ? { ...skill, ...updates } : skill
              ),
            }
          : cat
      )
    )
  }

  const removeSkill = (categoryId: string, skillIndex: number) => {
    setSkillCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              skills: cat.skills.filter((_, idx) => idx !== skillIndex),
            }
          : cat
      )
    )
  }

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let updatedProjects: Project[]
    
    if (editingProject) {
      // Update existing project
      updatedProjects = projects.map((p) =>
        p.id === editingProject.id ? { ...editingProject, ...projectForm, id: editingProject.id } : p
      )
      setProjects(updatedProjects)
      setEditingProject(null)
    } else {
      // Add new project
      const newProject: Project = {
        id: Date.now().toString(),
        ...projectForm,
      }
      updatedProjects = [...projects, newProject]
      setProjects(updatedProjects)
    }
    
    resetProjectForm()
    
    // Auto-save after adding/updating
    try {
      setSaving(true)
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProjects),
      })

      if (response.ok) {
        toast.success(editingProject ? "Project updated and saved!" : "Project added and saved!")
      } else {
        toast.error("Failed to save project")
      }
    } catch (error) {
      toast.error("Failed to save project")
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const startEditProject = (project: Project) => {
    setEditingProject(project)
    setProjectForm({
      title: project.title,
      description: project.description,
      image: project.image,
      imageFit: project.imageFit,
      imageBg: project.imageBg,
      technologies: project.technologies,
      demoLink: project.demoLink,
      codeLink: project.codeLink,
    })
  }

  const cancelEdit = () => {
    setEditingProject(null)
    resetProjectForm()
  }

  const resetProjectForm = () => {
    setProjectForm({
      title: "",
      description: "",
      image: "",
      imageFit: "contain",
      imageBg: "",
      technologies: [],
      demoLink: "",
      codeLink: "",
    })
    setNewTech("")
  }

  const addTechnology = () => {
    if (newTech.trim()) {
      setProjectForm((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }))
      setNewTech("")
    }
  }

  const removeTechnology = (index: number) => {
    setProjectForm((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }))
  }

  const deleteProject = async () => {
    if (deleteProjectId) {
      const updatedProjects = projects.filter((p) => p.id !== deleteProjectId)
      setProjects(updatedProjects)
      setDeleteProjectId(null)
      
      // Auto-save after deleting
      try {
        setSaving(true)
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProjects),
        })

        if (response.ok) {
          toast.success("Project deleted and saved!")
        } else {
          toast.error("Failed to save changes")
        }
      } catch (error) {
        toast.error("Failed to save changes")
        console.error(error)
      } finally {
        setSaving(false)
      }
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!authenticated) {
    return null // Will redirect to login
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-start"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Content Manager</h1>
            <p className="text-gray-400">Manage your skills and projects</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-red-500/50 text-red-400 hover:bg-red-500/20"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <Card className="bg-black/50 border border-white/10">
              <CardHeader>
                <CardTitle>Manage Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {skillCategories.map((category) => (
                  <div key={category.id} className="space-y-4 p-4 border border-white/10 rounded-lg">
                    <h3 className="text-xl font-semibold">{category.label}</h3>
                    <div className="space-y-2">
                      {category.skills.map((skill, index) => (
                        <SkillRow
                          key={index}
                          skill={skill}
                          categoryId={category.id}
                          skillIndex={index}
                          onUpdate={(updates) => updateSkill(category.id, index, updates)}
                          onRemove={() => removeSkill(category.id, index)}
                        />
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => addSkillToCategory(category.id)}
                      className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={saveSkills}
                  disabled={saving}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Saving..." : "Save Skills"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/50 border border-white/10">
                <CardHeader>
                  <CardTitle>{editingProject ? "Edit Project" : "Add New Project"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        required
                        className="bg-black/50 border-white/10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={projectForm.description}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, description: e.target.value })
                        }
                        required
                        rows={4}
                        className="bg-black/50 border-white/10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Image Path</Label>
                      <Input
                        id="image"
                        value={projectForm.image}
                        onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                        placeholder="/image.png"
                        required
                        className="bg-black/50 border-white/10"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="imageFit">Image Fit</Label>
                        <select
                          id="imageFit"
                          value={projectForm.imageFit}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              imageFit: e.target.value as "contain" | "cover",
                            })
                          }
                          className="w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-white"
                        >
                          <option value="contain">Contain</option>
                          <option value="cover">Cover</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="imageBg">Background Class</Label>
                        <Input
                          id="imageBg"
                          value={projectForm.imageBg}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, imageBg: e.target.value })
                          }
                          placeholder="bg-white"
                          className="bg-black/50 border-white/10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="technologies">Technologies</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          id="technologies"
                          value={newTech}
                          onChange={(e) => setNewTech(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                          placeholder="Add technology"
                          className="bg-black/50 border-white/10"
                        />
                        <Button type="button" onClick={addTechnology} variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {projectForm.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-blue-500/10 text-blue-400 border-blue-500/30"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTechnology(index)}
                              className="ml-2 hover:text-red-400"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="demoLink">Demo Link</Label>
                      <Input
                        id="demoLink"
                        type="url"
                        value={projectForm.demoLink}
                        onChange={(e) => setProjectForm({ ...projectForm, demoLink: e.target.value })}
                        required
                        className="bg-black/50 border-white/10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="codeLink">Code Link</Label>
                      <Input
                        id="codeLink"
                        type="url"
                        value={projectForm.codeLink}
                        onChange={(e) => setProjectForm({ ...projectForm, codeLink: e.target.value })}
                        required
                        className="bg-black/50 border-white/10"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        type="submit" 
                        disabled={saving}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? "Saving..." : editingProject ? "Update & Save" : "Add & Save Project"}
                      </Button>
                      {editingProject && (
                        <Button type="button" variant="outline" onClick={cancelEdit} className="flex-1">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border border-white/10">
                <CardHeader>
                  <CardTitle>Projects List ({projects.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="p-4 border border-white/10 rounded-lg space-y-2"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-lg">{project.title}</h4>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => startEditProject(project)}
                              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setDeleteProjectId(project.id)}
                              className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    {projects.length === 0 && (
                      <p className="text-center text-gray-400 py-8">No projects yet. Add one above!</p>
                    )}
                  </div>
                  <Button
                    onClick={saveProjects}
                    disabled={saving}
                    variant="outline"
                    className="w-full mt-4 border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Saving..." : "Manual Save (Auto-save enabled)"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={deleteProjectId !== null} onOpenChange={() => setDeleteProjectId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProject} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

