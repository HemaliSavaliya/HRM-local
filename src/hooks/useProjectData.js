/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useProjectData = () => {
  const [projectData, setProjectData] = useState([])
  const [editProjectId, setEditProjectId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const theme = useTheme()

  // Handle search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  // Utility function to get project from localStorage
  const getProjectFromLocalStorage = () => {
    const storedProject = localStorage.getItem('project')
    return storedProject ? JSON.parse(storedProject) : []
  }

  // Utility function to set project in localStorage
  const setProjectToLocalStorage = (pro) => {
    localStorage.setItem('project', JSON.stringify(pro))
  }

  const handleClose = () => {
    setOpen(false)
    setEditProjectId(null)
  }

  // For Edit data
  const handleEdit = id => {
    setEditProjectId(id)
    setOpen(true)
  }

  // for dialog box
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  // Function for toggle status
  const updateProjectStatus = async (id, newStatus) => {
    const project = getProjectFromLocalStorage()

    const updatedProject = project.map((pro) =>
      pro.id === id ? { ...pro, status: newStatus } : pro
    )

    setProjectToLocalStorage(updatedProject)
    setProjectData(updatedProject)

    toast.success('Project Status Updated!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontSize: '15px'
      }
    })
  }

  const fetchProjects = async () => {
    setLoading(true)
    const project = getProjectFromLocalStorage()
    setProjectData(project)
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // Function to add form data to localStorage
  const addProjects = async newProject => {
    const project = getProjectFromLocalStorage()

    // Add a unique ID and today's date to each new role
    const updatedProject = [...project, { ...newProject, id: Date.now() }]
    setProjectToLocalStorage(updatedProject)
    setProjectData(updatedProject)

    toast.success('Project Added Successfully!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontSize: '15px'
      }
    })

    setOpen(false)
  }

  // Function to edit form data to localStorage
  const editProjects = async (updatedData) => {
    const project = getProjectFromLocalStorage()

    // Find the project and update it
    const updatedProject = project.map((pro) =>
      pro.id === updatedData.id ? updatedData : pro
    )

    setProjectToLocalStorage(updatedProject)
    setProjectData(updatedProject)

    toast.success('Project Updated Successfully!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontSize: '15px'
      }
    })

    setOpen(false)
    setEditProjectId(null)
  }

  const handleDeleteProject = id => {
    setDeleteTargetId(id)
    setDeleteModalOpen(true)
  }

  const confirmDeleteProject = () => {
    if (deleteTargetId) {
      deleteProjects(deleteTargetId)
      setDeleteModalOpen(false)
    }
  }

  // Function to delete form data to localStorage
  const deleteProjects = async id => {
    // Get the current list of project from localStorage
    const project = getProjectFromLocalStorage()

    // Filter out the project that needs to be deleted
    const updatedProject = project.filter(pro => pro.id !== id)

    // Update localStorage with the new list
    setProjectToLocalStorage(updatedProject)

    // Update the state to reflect changes in the UI
    setProjectData(updatedProject)

    // Show success message
    toast.success('Project Deleted Successfully!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontSize: '15px'
      }
    })
  }

  // Function to delete specified project document data from database
  const deleteDocumentData = async (fileName, projectId) => {
    // Get the current list of project from localStorage
    const project = getProjectFromLocalStorage()

    // Find the project by id
    const updatedProject = project.map((emp) => {
      if (emp.id === projectId) {
        // Remove the document with the matching fileName from the document array
        const updatedDocuments = emp.document.filter(doc => doc.path !== fileName)

        return { ...emp, document: updatedDocuments }
      }
      return emp
    })

    // Update localStorage with the modified list of project
    setProjectToLocalStorage(updatedProject)

    // Update the state to reflect changes in the UI
    setProjectData(updatedProject)

    // Show success message
    toast.success('Project Document Deleted Successfully!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontSize: '15px'
      }
    })
  }

  return {
    loading,
    projectData,
    editProjectId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    addProjects,
    editProjects,
    deleteProjects,
    updateProjectStatus,
    deleteDocumentData,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteProject,
    handleDeleteProject,
    searchQuery,
    handleSearchChange
  }
}

export default useProjectData
