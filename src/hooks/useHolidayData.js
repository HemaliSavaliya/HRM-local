
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useHolidayData = () => {
    const [holidayData, setHolidayData] = useState([])
    const [editHolidayId, setEditHolidayId] = useState(null)
    const [open, setOpen] = useState(false)
    const [scroll, setScroll] = useState('body')
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deleteTargetId, setDeleteTargetId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const theme = useTheme()

    // Handle search input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    // Utility function to get holiday from localStorage
    const getHolidayFromLocalStorage = () => {
        const storedHoliday = localStorage.getItem('holiday')
        return storedHoliday ? JSON.parse(storedHoliday) : []
    }

    // Utility function to set holiday in localStorage
    const setHolidayToLocalStorage = (holiday) => {
        localStorage.setItem('holiday', JSON.stringify(holiday))
    }

    const handleClose = () => {
        setOpen(false)
        setEditHolidayId(null)
    }

    // For Edit data
    const handleEdit = id => {
        setEditHolidayId(id)
        setOpen(true)
    }

    // for dialog box
    const handleClickOpen = scrollType => () => {
        setOpen(true)
        setScroll(scrollType)
    }

    const fetchHoliday = async () => {
        setLoading(true)
        const holiday = getHolidayFromLocalStorage()
        setHolidayData(holiday)
        setLoading(false)
    }

    useEffect(() => {
        fetchHoliday()
    }, [])

    // Function to add form data to localStorage
    const addHoliday = async newHoliday => {
        const holiday = getHolidayFromLocalStorage()

        // Add a unique ID and today's date to each new role
        const updatedHoliday = [...holiday, { ...newHoliday, id: Date.now() }]
        setHolidayToLocalStorage(updatedHoliday)
        setHolidayData(updatedHoliday)

        toast.success('Holiday Added Successfully!', {
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
    const editHoliday = async (updatedData, holidayId) => {
        const holiday = getHolidayFromLocalStorage()

        // Find the holiday and update it
        const updatedHoliday = holiday.map((holiday) =>
            holiday.id === updatedData.id ? updatedData : holiday
        )

        setHolidayToLocalStorage(updatedHoliday)
        setHolidayData(updatedHoliday)

        toast.success('Holiday Updated Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })

        setOpen(false)
        setEditHolidayId(null)
    }

    const handleDeleteHoliday = id => {
        setDeleteTargetId(id)
        setDeleteModalOpen(true)
    }

    const confirmDeleteHoliday = () => {
        if (deleteTargetId) {
            deleteHoliday(deleteTargetId)
            setDeleteModalOpen(false)
        }
    }

    // Function to delete form data to localStorage
    const deleteHoliday = async id => {
        // Get the current list of holiday from localStorage
        const holiday = getHolidayFromLocalStorage()

        // Filter out the holiday that needs to be deleted
        const updatedHoliday = holiday.filter(holiday => holiday.id !== id)

        // Update localStorage with the new list
        setHolidayToLocalStorage(updatedHoliday)

        // Update the state to reflect changes in the UI
        setHolidayData(updatedHoliday)

        // Show success message
        toast.success('Holiday Deleted Successfully!', {
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
        holidayData,
        editHolidayId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        addHoliday,
        editHoliday,
        deleteHoliday,
        deleteModalOpen,
        setDeleteModalOpen,
        confirmDeleteHoliday,
        handleDeleteHoliday,
        searchQuery,
        handleSearchChange
    }
}

export default useHolidayData
