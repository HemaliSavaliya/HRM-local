/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useAwardsData = () => {
    const [awardsData, setAwardsData] = useState([])
    const [editAwardId, setEditAwardId] = useState(null)
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

    // Utility function to get award from localStorage
    const getAwardFromLocalStorage = () => {
        const storedAward = localStorage.getItem('award')
        return storedAward ? JSON.parse(storedAward) : []
    }

    // Utility function to set award in localStorage
    const setAwardToLocalStorage = (award) => {
        localStorage.setItem('award', JSON.stringify(award))
    }

    const handleClose = () => {
        setOpen(false)
        setEditAwardId(null)
    }

    // For Edit data
    const handleEdit = id => {
        setEditAwardId(id)
        setOpen(true)
    }

    // for dialog box
    const handleClickOpen = scrollType => () => {
        setOpen(true)
        setScroll(scrollType)
    }

    const defaultAwards = [
        {
            id: Date.now() + Math.random(),
            awardsName: "Armand Mejia",
            awardsDetails: "Maxime quis praesent",
            employeeName: "John Doe",
            reward: "Qui mollitia dolor s",
            employeeId: 1733976537056.0767
        },
        {
            id: Date.now() + Math.random(),
            awardsName: "Employee of the Month",
            awardsDetails: "Awarded for exceptional performance and dedication.",
            employeeName: "Carol White",
            reward: "Certificate of Excellence",
            employeeId: 1733976537056.389
        },
        {
            id: Date.now() + Math.random(),
            awardsName: "Best Salesperson",
            awardsDetails: "For achieving the highest sales figures in Q1.",
            employeeName: "Dave Clark",
            reward: "Bonus and Trophy",
            employeeId: 1733976537056.3477
        },
        {
            id: Date.now() + Math.random(),
            awardsName: "Customer Service Star",
            awardsDetails: "For outstanding customer service and support.",
            employeeName: "John Doe",
            reward: "Gift Voucher",
            employeeId: 1733976537056.0767
        },
        {
            id: Date.now() + Math.random(),
            awardsName: "Innovation Award",
            awardsDetails: "For developing an innovative solution that improved efficiency.",
            employeeName: "Eve Martinez",
            reward: "Plaque and Bonus",
            employeeId: 1733976537056.2383
        },
        {
            id: Date.now() + Math.random(),
            awardsName: "Leadership Excellence",
            awardsDetails: "For demonstrating exceptional leadership skills.",
            employeeName: "John Doe",
            reward: "Leadership Certificate",
            employeeId: 1733976537056.0767
        },
        {
            id: Date.now() + Math.random(),
            awardsName: "Team Player Award",
            awardsDetails: "For outstanding teamwork and collaboration.",
            employeeName: "Carol White",
            reward: "Team Player Trophy",
            employeeId: 1733976537056.389
        },
        {
            id: Date.now() + Math.random(),
            awardsName: "Rising Star",
            awardsDetails: "For showing great potential and achieving significant milestones.",
            employeeName: "Dave Clark",
            reward: "Certificate and Bonus",
            employeeId: 1733976537056.3477
        },
        {
            id: Date.now() + Math.random(),
            awardsName: "Top Innovator",
            awardsDetails: "For leading innovative projects that drove company growth.",
            employeeName: "Eve Martinez",
            reward: "Innovation Trophy",
            employeeId: 1733976537056.2383
        },
        {
            id: Date.now() + Math.random(),
            awardsName: "Outstanding Achiever",
            awardsDetails: "For consistently exceeding performance targets.",
            employeeName: "Carol White",
            reward: "Achievement Medal",
            employeeId: 1733976537056.389
        }
    ];

    const fetchAwards = async () => {
        const award = getAwardFromLocalStorage()
        if (award.length === 0) {
            // Initialize with default roles if no roles exist
            setAwardToLocalStorage(defaultAwards);
            setAwardsData(defaultAwards);
        } else {
            setAwardsData(award)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAwards()
    }, [])

    // Function to add form data to localStorage
    const addAwards = async newAward => {
        const award = getAwardFromLocalStorage()

        // Add a unique ID and today's date to each new role
        const updatedAward = [...award, { ...newAward, id: Date.now() }]
        setAwardToLocalStorage(updatedAward)
        setAwardsData(updatedAward)

        toast.success('Award Added Successfully!', {
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
    const editAwards = async (updatedData) => {
        const award = getAwardFromLocalStorage()

        // Find the award and update it
        const updatedAward = award.map((award) =>
            award.id === updatedData.id ? updatedData : award
        )

        setAwardToLocalStorage(updatedAward)
        setAwardsData(updatedAward)

        toast.success('Award Updated Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })

        setOpen(false)
        setEditAwardId(null)
    }

    const handleDeleteAward = id => {
        setDeleteTargetId(id)
        setDeleteModalOpen(true)
    }

    const confirmDeleteAward = () => {
        if (deleteTargetId) {
            deleteAwards(deleteTargetId)
            setDeleteModalOpen(false)
        }
    }

    // Function to delete form data to localStorage
    const deleteAwards = async id => {
        // Get the current list of award from localStorage
        const award = getAwardFromLocalStorage()

        // Filter out the award that needs to be deleted
        const updatedAward = award.filter(award => award.id !== id)

        // Update localStorage with the new list
        setAwardToLocalStorage(updatedAward)

        // Update the state to reflect changes in the UI
        setAwardsData(updatedAward)

        // Show success message
        toast.success('Award Deleted Successfully!', {
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
        awardsData,
        editAwardId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        addAwards,
        editAwards,
        deleteAwards,
        deleteModalOpen,
        setDeleteModalOpen,
        confirmDeleteAward,
        handleDeleteAward,
        searchQuery,
        handleSearchChange
    }
}

export default useAwardsData
