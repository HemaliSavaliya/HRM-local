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

    const fetchAnnouncement = async () => {
        setLoading(true)
        const announcement = getAnnouncementFromLocalStorage()
        setAnnouncementData(announcement)
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
