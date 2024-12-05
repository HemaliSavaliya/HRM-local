/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useLeaveReqData = () => {
    const [leaveReqData, setLeaveReqData] = useState([])
    const [open, setOpen] = useState(false)
    const [scroll, setScroll] = useState('body')
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
    const theme = useTheme()

    // Handle search input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    // Utility function to get leave request from localStorage
    const getLeaveReqFromLocalStorage = () => {
        const storedLeaveReq = localStorage.getItem('leaveRequest')

        // Filter data based on role
        const filteredData = authToken?.role === 'hr'
            ? storedLeaveReq.filter(req => req.role === 'hr')
            : authToken?.role === 'employee'
                ? storedLeaveReq.filter(req => req.role === 'employee')
                : storedLeaveReq;

        return filteredData ? JSON.parse(filteredData) : []
    }

    // Utility function to set leave in localStorage
    const setLeaveReqToLocalStorage = (leave) => {
        localStorage.setItem('leaveRequest', JSON.stringify(leave))
    }

    const handleClose = () => {
        setOpen(false)
    }

    // for dialog box
    const handleClickOpen = scrollType => () => {
        setOpen(true)
        setScroll(scrollType)
    }

    const updateLeaveRequestStatus = async (leaveRequestId, newStatus) => {
        const leaveReq = getLeaveReqFromLocalStorage()

        const updatedLeaveReq = leaveReq.map((leave) =>
            leave.id === leaveRequestId ? { ...leave, status: newStatus } : leave
        )

        setLeaveReqToLocalStorage(updatedLeaveReq)
        setLeaveReqData(updatedLeaveReq)

        toast.success('Leave Request Status Updated!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })
    }

    const fetchLeaveRequest = async () => {
        setLoading(true)
        const storedData = JSON.parse(localStorage.getItem('leaveRequest')) || []

        // Filter data based on role
        const filteredData = authToken?.role === 'hr'
            ? storedData.filter(req => req.role === 'hr')
            : authToken?.role === 'employee'
                ? storedData.filter(req => req.role === 'employee')
                : storedData;

        setLeaveReqData(filteredData)
        setLoading(false)
    }

    useEffect(() => {
        fetchLeaveRequest()
    }, [])

    // Function to add form data to localStorage
    const addLeaveRequest = async newLeaveReq => {
        const leaveReq = getLeaveReqFromLocalStorage()

        // Get today's date in DD/MM/YYYY format
        const today = new Date().toLocaleDateString('en-GB')

        // Add a unique ID and today's date to each new role
        const updatedLeaveReq = [...leaveReq,
        {
            ...newLeaveReq,
            name: authToken?.name,
            role: authToken?.role,
            id: Date.now(),
            applyingDate: today,
            status: 'pending'
        }]
        setLeaveReqToLocalStorage(updatedLeaveReq)
        setLeaveReqData(updatedLeaveReq)

        toast.success('Leave Request Added Successfully!', {
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

    return {
        loading,
        leaveReqData,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        addLeaveRequest,
        updateLeaveRequestStatus,
        searchQuery,
        handleSearchChange
    }
}

export default useLeaveReqData
