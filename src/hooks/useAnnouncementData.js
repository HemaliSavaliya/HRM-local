/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useAnnouncementData = () => {
    const [announcementData, setAnnouncementData] = useState([])
    const [editAnnoId, setEditAnnoId] = useState(null)
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

    // Utility function to get Announcement from localStorage
    const getAnnouncementFromLocalStorage = () => {
        const storedAnnouncement = localStorage.getItem('announcement')
        return storedAnnouncement ? JSON.parse(storedAnnouncement) : []
    }

    // Utility function to set Announcement in localStorage
    const setAnnouncementToLocalStorage = (ann) => {
        localStorage.setItem('announcement', JSON.stringify(ann))
    }

    const handleClose = () => {
        setOpen(false)
        setEditAnnoId(null)
    }

    // For Edit data
    const handleEdit = id => {
        setEditAnnoId(id)
        setOpen(true)
    }

    // for dialog box
    const handleClickOpen = scrollType => () => {
        setOpen(true)
        setScroll(scrollType)
    }

    const defaultAnnouncements = [
        {
            id: Date.now() + Math.random(),
            announcementTitle: "Repellendus Culpa",
            announcementDetails: "Labore consectetur",
            selectDepartment: "Human Resources",
            document: [
                {
                    name: "client-2.jpg",
                    data: "https://img.freepik.com/free-photo/happy-financial-consultant-greeting-his-clients-while-meeting-them-their-home-me-are-shaking-hands_637285-3763.jpg?ga=GA1.1.1394412994.1693369716&semt=ais_hybrid"
                }
            ]
        },
        {
            id: Date.now() + Math.random(),
            announcementTitle: "Quarterly Meeting",
            announcementDetails: "The quarterly meeting will be held next Monday.",
            selectDepartment: "Finance",
            document: [
                {
                    name: "meeting-agenda.pdf",
                    data: "https://img.freepik.com/premium-photo/meeting-agenda-inscription-business-appointment-event-office-schedule_361816-376.jpg?ga=GA1.1.1394412994.1693369716&semt=ais_hybrid"
                }
            ]
        },
        {
            id: Date.now() + Math.random(),
            announcementTitle: "New Office Opening",
            announcementDetails: "We are excited to announce the opening of our new office.",
            selectDepartment: "Operations",
            document: [
                {
                    name: "office-opening.jpg",
                    data: "https://img.freepik.com/premium-photo/happy-business-team-cutting-red-ribbon_13339-138683.jpg?ga=GA1.1.1394412994.1693369716&semt=ais_hybrid"
                }
            ]
        },
        {
            id: Date.now() + Math.random(),
            announcementTitle: "Health and Safety Training",
            announcementDetails: "Mandatory health and safety training for all employees.",
            selectDepartment: "Customer Service",
            document: [
                {
                    name: "training-schedule.pdf",
                    data: "https://img.freepik.com/free-photo/daily-life-business-people-office_53876-47111.jpg?ga=GA1.1.1394412994.1693369716&semt=ais_hybrid"
                }
            ]
        },
        {
            id: Date.now() + Math.random(),
            announcementTitle: "Holiday Schedule",
            announcementDetails: "Please find attached the holiday schedule for this year.",
            selectDepartment: "Legal",
            document: [
                {
                    name: "holiday-schedule.pdf",
                    data: "https://img.freepik.com/free-photo/still-life-colorful-overloaded-bullet-journal_23-2150168648.jpg?ga=GA1.1.1394412994.1693369716&semt=ais_hybrid"
                }
            ]
        },
        {
            id: Date.now() + Math.random(),
            announcementTitle: "Team Building Event",
            announcementDetails: "Join us for a team-building event next Friday.",
            selectDepartment: "Marketing",
            document: [
                {
                    name: "team-building.jpg",
                    data: "https://img.freepik.com/free-photo/teamwork-collaboration-team-graphic-word_53876-13828.jpg?ga=GA1.1.1394412994.1693369716&semt=ais_hybrid"
                }
            ]
        },
        {
            id: Date.now() + Math.random(),
            announcementTitle: "IT System Upgrade",
            announcementDetails: "Scheduled IT system upgrade on Saturday.",
            selectDepartment: "IT",
            document: [
                {
                    name: "it-upgrade.pdf",
                    data: "https://img.freepik.com/free-photo/data-backup-online-connection_53876-120060.jpg?ga=GA1.1.1394412994.1693369716&semt=ais_hybrid"
                }
            ]
        },
        {
            id: Date.now() + Math.random(),
            announcementTitle: "Employee Appreciation Day",
            announcementDetails: "Celebrate Employee Appreciation Day with us!",
            selectDepartment: "HR",
            document: [
                {
                    name: "employee-appreciation.jpg",
                    data: "https://img.freepik.com/free-photo/medium-shot-people-celebrating-work_23-2149295529.jpg?ga=GA1.1.1394412994.1693369716&semt=ais_hybrid"
                }
            ]
        },
        {
            id: Date.now() + Math.random(),
            announcementTitle: "Project Launch",
            announcementDetails: "We are excited to launch our new project.",
            selectDepartment: "Research and Development",
            document: [
                {
                    name: "project-launch.pdf",
                    data: "https://img.freepik.com/free-photo/plan-project-architecture-blueprint-drawing-concept_53876-13746.jpg?ga=GA1.1.1394412994.1693369716&semt=ais_hybrid"
                }
            ]
        },
        {
            id: Date.now() + Math.random(),
            announcementTitle: "Client Visit",
            announcementDetails: "Our client will be visiting the office next week.",
            selectDepartment: "Sales",
            document: [
                {
                    name: "client-visit.jpg",
                    data: "https://img.freepik.com/free-photo/business-people-informal-meeting_1262-1400.jpg?ga=GA1.1.1394412994.1693369716&semt=ais_hybrid"
                }
            ]
        }
    ];

    const fetchAnnouncement = async () => {
        const announcement = getAnnouncementFromLocalStorage()
        if (announcement.length === 0) {
            // Initialize with default roles if no roles exist
            setAnnouncementToLocalStorage(defaultAnnouncements);
            setAnnouncementData(defaultAnnouncements);
        } else {
            setAnnouncementData(announcement)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAnnouncement()
    }, [])

    // Function to add form data to localStorage
    const addAnnouncement = async newAnno => {
        const announcement = getAnnouncementFromLocalStorage()

        // Add a unique ID and today's date to each new role
        const updatedAnnouncement = [...announcement, { ...newAnno, id: Date.now() }]
        setAnnouncementToLocalStorage(updatedAnnouncement)
        setAnnouncementData(updatedAnnouncement)

        toast.success('Announcement Added Successfully!', {
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
    const editAnnouncement = async (updatedData) => {
        const announcement = getAnnouncementFromLocalStorage();

        // Find the announcement and merge the existing documents with the new ones
        const updatedAnnouncement = announcement.map((anno) => {
            if (anno.id === updatedData.id) {
                return {
                    // ...anno,
                    ...updatedData,
                    document: [...(updatedData.document || [])], // Merge existing and new documents
                };
            }

            return anno;
        });

        setAnnouncementToLocalStorage(updatedAnnouncement);
        setAnnouncementData(updatedAnnouncement);

        toast.success('Announcement Updated Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px',
            },
        });

        setOpen(false);
        setEditAnnoId(null);
    };

    const handleDeleteAnnouncement = id => {
        setDeleteTargetId(id)
        setDeleteModalOpen(true)
    }

    const confirmDeleteAnnouncement = () => {
        if (deleteTargetId) {
            deleteAnnouncement(deleteTargetId)
            setDeleteModalOpen(false)
        }
    }

    // Function to delete form data to localStorage
    const deleteAnnouncement = async id => {
        // Get the current list of Announcement from localStorage
        const announcement = getAnnouncementFromLocalStorage()

        // Filter out the Announcement that needs to be deleted
        const updatedAnnouncement = announcement.filter(anno => anno.id !== id)

        // Update localStorage with the new list
        setAnnouncementToLocalStorage(updatedAnnouncement)

        // Update the state to reflect changes in the UI
        setAnnouncementData(updatedAnnouncement)

        // Show success message
        toast.success('Announcement Deleted Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })
    }

    // Function to delete specified announcement document data from database
    const deleteDocumentData = async (fileName, announcementId) => {
        // Get the current list of Announcements from localStorage
        const announcement = getAnnouncementFromLocalStorage()

        // Find the announcement by id
        const updatedAnnouncement = announcement.map((anno) => {
            if (anno.id === announcementId) {
                // Remove the document with the matching fileName from the document array
                const updatedDocuments = anno.document.filter(doc => doc.name !== fileName)

                return { ...anno, document: updatedDocuments }
            }
            return anno
        })

        // Update localStorage with the modified list of announcements
        setAnnouncementToLocalStorage(updatedAnnouncement)

        // Update the state to reflect changes in the UI
        setAnnouncementData(updatedAnnouncement)

        // Show success message
        toast.success('Announcement Document Deleted Successfully!', {
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
        announcementData,
        editAnnoId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        addAnnouncement,
        editAnnouncement,
        deleteAnnouncement,
        deleteDocumentData,
        deleteModalOpen,
        setDeleteModalOpen,
        confirmDeleteAnnouncement,
        handleDeleteAnnouncement,
        searchQuery,
        handleSearchChange
    }
}

export default useAnnouncementData
