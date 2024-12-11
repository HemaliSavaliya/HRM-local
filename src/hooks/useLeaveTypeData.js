/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useLeaveTypeData = () => {
    const [leaveTypeData, setLeaveTypeData] = useState([])
    const [editLeaveTypeId, setEditLeaveTypeId] = useState(null)
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

    // Utility function to get leave from localStorage
    const getLeaveFromLocalStorage = () => {
        const storedLeave = localStorage.getItem('leaveType')
        return storedLeave ? JSON.parse(storedLeave) : []
    }

    // Utility function to set leave in localStorage
    const setLeaveToLocalStorage = (leave) => {
        localStorage.setItem('leaveType', JSON.stringify(leave))
    }

    const handleClose = () => {
        setOpen(false)
        setEditLeaveTypeId(null)
    }

    // For Edit data
    const handleEdit = id => {
        setEditLeaveTypeId(id)
        setOpen(true)
    }

    // for dialog box
    const handleClickOpen = scrollType => () => {
        setOpen(true)
        setScroll(scrollType)
    }

    // Function for toggle leaveStatus
    const updateLeaveTypeStatus = async (id, newStatus) => {
        const leave = getLeaveFromLocalStorage()

        const updatedLeave = leave.map((leave) =>
            leave.id === id ? { ...leave, leaveStatus: newStatus } : leave
        )

        setLeaveToLocalStorage(updatedLeave)
        setLeaveTypeData(updatedLeave)

        toast.success('Leave Type Status Updated!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })
    }

    const defaultLeaves = [
        {
            id: Date.now() + Math.random(),
            leaveName: "Sick Leave",
            leaveBalance: "10",
            leaveStatus: "Active",
            leaveAddingDate: "11/12/2024"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Casual Leave",
            leaveBalance: "15",
            leaveStatus: "Active",
            leaveAddingDate: "10/12/2024"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Maternity Leave",
            leaveBalance: "12",
            leaveStatus: "Active",
            leaveAddingDate: "09/12/2024"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Paternity Leave",
            leaveBalance: "20",
            leaveStatus: "Inactive",
            leaveAddingDate: "08/12/2024"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Annual Leave",
            leaveBalance: "18",
            leaveStatus: "Active",
            leaveAddingDate: "07/12/2024"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Bereavement Leave",
            leaveBalance: "25",
            leaveStatus: "Inactive",
            leaveAddingDate: "06/12/2024"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Unpaid Leave",
            leaveBalance: "30",
            leaveStatus: "Active",
            leaveAddingDate: "05/12/2024"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Study Leave",
            leaveBalance: "10",
            leaveStatus: "Inactive",
            leaveAddingDate: "04/12/2024"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Compensatory Leave",
            leaveBalance: "15",
            leaveStatus: "Active",
            leaveAddingDate: "03/12/2024"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Marriage Leave",
            leaveBalance: "20",
            leaveStatus: "Active",
            leaveAddingDate: "02/12/2024"
        }
    ];

    const fetchLeaveType = async () => {
        const leave = getLeaveFromLocalStorage()
        if (leave.length === 0) {
            // Initialize with default roles if no roles exist
            setLeaveToLocalStorage(defaultLeaves);
            setLeaveTypeData(defaultLeaves);
        } else {
            setLeaveTypeData(leave)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchLeaveType()
    }, [])

    // Function to add form data to localStorage
    const addLeaveType = async newLeaveType => {
        const leave = getLeaveFromLocalStorage()

        // Get today's date in DD/MM/YYYY format
        const today = new Date().toLocaleDateString('en-GB')

        // Add a unique ID and today's date to each new role
        const updatedLeave = [...leave, { ...newLeaveType, id: Date.now(), leaveAddingDate: today }]
        setLeaveToLocalStorage(updatedLeave)
        setLeaveTypeData(updatedLeave)

        toast.success('Leave Type Added Successfully!', {
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
    const editLeaveType = async (updatedData) => {
        const leave = getLeaveFromLocalStorage()

        // Find the leave and update it
        const updatedLeave = leave.map((leave) =>
            leave.id === updatedData.id ? updatedData : leave
        )

        setLeaveToLocalStorage(updatedLeave)
        setLeaveTypeData(updatedLeave)

        toast.success('Leave Type Updated Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })

        setOpen(false)
        setEditLeaveTypeId(null)
    }

    const handleDeleteLeaveType = id => {
        setDeleteTargetId(id)
        setDeleteModalOpen(true)
    }

    const confirmDeleteLeaveType = () => {
        if (deleteTargetId) {
            deleteLeaveType(deleteTargetId)
            setDeleteModalOpen(false)
        }
    }

    // Function to delete form data to localStorage
    const deleteLeaveType = async id => {
        // Get the current list of leave from localStorage
        const leave = getLeaveFromLocalStorage()

        // Filter out the leave that needs to be deleted
        const updatedLeave = leave.filter(leave => leave.id !== id)

        // Update localStorage with the new list
        setLeaveToLocalStorage(updatedLeave)

        // Update the state to reflect changes in the UI
        setLeaveTypeData(updatedLeave)

        // Show success message
        toast.success('Leave Type Deleted Successfully!', {
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
        leaveTypeData,
        editLeaveTypeId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        addLeaveType,
        editLeaveType,
        deleteLeaveType,
        updateLeaveTypeStatus,
        deleteModalOpen,
        setDeleteModalOpen,
        confirmDeleteLeaveType,
        handleDeleteLeaveType,
        searchQuery,
        handleSearchChange
    }
}

export default useLeaveTypeData
