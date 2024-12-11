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

  // // Function for toggle status
  // const updateProjectStatus = async (id, newStatus) => {
  //   const project = getProjectFromLocalStorage()

  //   const updatedProject = project.map((pro) =>
  //     pro.id === id ? { ...pro, status: newStatus } : pro
  //   )

  //   setProjectToLocalStorage(updatedProject)
  //   setProjectData(updatedProject)

  //   toast.success('Project Status Updated!', {
  //     duration: 2000,
  //     position: 'top-center',
  //     style: {
  //       background: theme.palette.background.paper,
  //       color: theme.palette.text.primary,
  //       fontSize: '15px'
  //     }
  //   })
  // }

  const defaultProjects = [
    {
      id: Date.now() + Math.random(),
      projectName: "Jaquelyn Sullivan",
      clientName: "Constance Morrow",
      clientEmail: "zecifolimo@mailinator.com",
      startDate: "2009-12-29",
      endDate: "2010-03-03",
      status: "Upcoming",
      userId: [1733830327344.3777],
      teamMembers: ["Dave Clark"],
      document: [
        {
          name: "author-2.jpg",
          data: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRy"
        }
      ]
    },
    {
      id: Date.now() + Math.random(),
      projectName: "Emily Davis",
      clientName: "Michaela Turner",
      clientEmail: "michaela.turner@mailinator.com",
      startDate: "2018-04-10",
      endDate: "2018-07-15",
      status: "Inprogress",
      userId: [1733830327344.3778],
      teamMembers: ["Jane Smith"],
      document: [
        {
          name: "project_doc.pdf",
          data: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MNCjEgMCBvYmoKPDwvTGVuZ3..."
        }
      ]
    },
    {
      id: Date.now() + Math.random(),
      projectName: "Michael Johnson",
      clientName: "Linda Harris",
      clientEmail: "linda.harris@mailinator.com",
      startDate: "2019-05-20",
      endDate: "2019-11-10",
      status: "Completed",
      userId: [1733830327344.3779],
      teamMembers: ["John Doe"],
      document: [
        {
          name: "final_report.docx",
          data: "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,dGVzdCBkYXRhLg=="
        }
      ]
    },
    {
      id: Date.now() + Math.random(),
      projectName: "Sophia Brown",
      clientName: "Alex Green",
      clientEmail: "alex.green@mailinator.com",
      startDate: "2021-08-12",
      endDate: "2022-01-20",
      status: "Upcoming",
      userId: [1733830327344.3780],
      teamMembers: ["Amanda White"],
      document: [
        {
          name: "proposal.pptx",
          data: "data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,cGFzc3dvcmQh"
        }
      ]
    },
    {
      id: Date.now() + Math.random(),
      projectName: "Oliver Moore",
      clientName: "Chloe Jackson",
      clientEmail: "chloe.jackson@mailinator.com",
      startDate: "2017-03-15",
      endDate: "2017-08-25",
      status: "Inprogress",
      userId: [1733830327344.3781],
      teamMembers: ["Brian Lee"],
      document: [
        {
          name: "mockup.png",
          data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQ...5ErkJggg=="
        }
      ]
    },
    {
      id: Date.now() + Math.random(),
      projectName: "Ethan Wilson",
      clientName: "Nina Scott",
      clientEmail: "nina.scott@mailinator.com",
      startDate: "2020-06-10",
      endDate: "2020-12-05",
      status: "Completed",
      userId: [1733830327344.3782],
      teamMembers: ["Chris Evans"],
      document: [
        {
          name: "invoice.pdf",
          data: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MNCjEgMCBvYmoKPDwvTGVuZ3..."
        }
      ]
    },
    {
      id: Date.now() + Math.random(),
      projectName: "Isabella Williams",
      clientName: "Diana Ross",
      clientEmail: "diana.ross@mailinator.com",
      startDate: "2016-09-05",
      endDate: "2017-02-28",
      status: "Inprogress",
      userId: [1733830327344.3783],
      teamMembers: ["Steve Rogers"],
      document: [
        {
          name: "requirements.docx",
          data: "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,dGVzdCBkYXRhLg=="
        }
      ]
    },
    {
      id: Date.now() + Math.random(),
      projectName: "James Martinez",
      clientName: "Peter Parker",
      clientEmail: "peter.parker@mailinator.com",
      startDate: "2015-07-20",
      endDate: "2016-01-10",
      status: "Upcoming",
      userId: [1733830327344.3784],
      teamMembers: ["Tony Stark"],
      document: [
        {
          name: "timeline.xlsx",
          data: "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,dGVzdCBkYXRhLg=="
        }
      ]
    },
    {
      id: Date.now() + Math.random(),
      projectName: "Ava Taylor",
      clientName: "Bruce Wayne",
      clientEmail: "bruce.wayne@mailinator.com",
      startDate: "2022-04-18",
      endDate: "2022-09-30",
      status: "Upcoming",
      userId: [1733830327344.3785],
      teamMembers: ["Clark Kent"],
      document: [
        {
          name: "contract.pdf",
          data: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MNCjEgMCBvYmoKPDwvTGVuZ3..."
        }
      ]
    },
    {
      id: Date.now() + Math.random(),
      projectName: "Charlotte Lee",
      clientName: "Barry Allen",
      clientEmail: "barry.allen@mailinator.com",
      startDate: "2021-10-25",
      endDate: "2022-03-15",
      status: "Completed",
      userId: [1733830327344.3786],
      teamMembers: ["Diana Prince"],
      document: [
        {
          name: "budget.xlsx",
          data: "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,dGVzdCBkYXRhLg=="
        }
      ]
    }
  ];

  const fetchProjects = async () => {
    const project = getProjectFromLocalStorage()
    if (project.length === 0) {
      // Initialize with default roles if no roles exist
      setProjectToLocalStorage(defaultProjects);
      setProjectData(defaultProjects);
    } else {
      setProjectData(project)
    }
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
    const updatedProject = project.map((pro) => {
      if (pro.id === updatedData.id) {
        return {
          // ...pro,
          ...updatedData,
          document: [...(updatedData.document || [])]
        };
      }

      return pro;
    });

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
        const updatedDocuments = emp.document.filter(doc => doc.name !== fileName)

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
    // updateProjectStatus,
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
