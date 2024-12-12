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
        return storedLeaveReq ? JSON.parse(storedLeaveReq) : []
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

    const defaultLeaveRequests = [
        {
            id: Date.now() + Math.random(),
            leaveName: "Casual Leave",
            startDate: "2024-12-18",
            endDate: "2024-12-20",
            leaveType: "Full Day",
            description: "Fugit omnis quae qu",
            name: "Winter Stone",
            employeeId: 1733981078792.9788,
            role: "hr",
            applyingDate: "11/12/2024",
            status: "pending"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Sick Leave",
            startDate: "2024-12-13",
            endDate: "",
            leaveType: "Half Day",
            description: "Modi debitis et nequ",
            name: "Winter Stone",
            employeeId: 1733981078792.9788,
            role: "hr",
            applyingDate: "11/12/2024",
            status: "pending"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Annual Leave",
            startDate: "2025-01-10",
            endDate: "",
            leaveType: "Half Day",
            description: "Annual vacation for the new year",
            name: "Emily Davis",
            employeeId: 1733981078792.0046,
            role: "manager",
            applyingDate: "10/12/2024",
            status: "pending"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Compensatory Leave",
            startDate: "2024-12-25",
            endDate: "2024-12-26",
            leaveType: "Full Day",
            description: "Compensation for working on a holiday",
            name: "Michael Johnson",
            employeeId: 1733981078792.4543,
            role: "hr",
            applyingDate: "09/12/2024",
            status: "pending"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Unpaid Leave",
            startDate: "2025-02-01",
            endDate: "2025-02-15",
            leaveType: "Full Day",
            description: "To spend time with newborn",
            name: "John Doe",
            employeeId: 1733981078792.7847,
            role: "employee",
            applyingDate: "08/12/2024",
            status: "pending"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Unpaid Leave",
            startDate: "2024-12-30",
            endDate: "2025-01-05",
            leaveType: "Full Day",
            description: "Personal reasons",
            name: "Jane Smith",
            employeeId: 1733981078792.275,
            role: "manager",
            applyingDate: "07/12/2024",
            status: "pending"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Casual Leave",
            startDate: "2025-03-01",
            endDate: "",
            leaveType: "Half Day",
            description: "For attending a training program",
            name: "Alice Johnson",
            employeeId: 1733981078792.9553,
            role: "hr",
            applyingDate: "06/12/2024",
            status: "pending"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Marriage Leave",
            startDate: "2025-04-10",
            endDate: "2025-04-20",
            leaveType: "Full Day",
            description: "For wedding and related ceremonies",
            name: "Bob Brown",
            employeeId: 1733981078792.884,
            role: "hr",
            applyingDate: "05/12/2024",
            status: "pending"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Sick Leave",
            startDate: "2025-05-05",
            endDate: "2025-05-10",
            leaveType: "Full Day",
            description: "To attend the funeral of a relative",
            name: "Carol White",
            employeeId: 1733981078792.4077,
            role: "employee",
            applyingDate: "04/12/2024",
            status: "pending"
        },
        {
            id: Date.now() + Math.random(),
            leaveName: "Casual Leave",
            startDate: "2024-12-22",
            endDate: "",
            leaveType: "Half Day",
            description: "Personal matter",
            name: "Dave Clark",
            employeeId: 1733981078792.038,
            role: "employee",
            applyingDate: "03/12/2024",
            status: "pending"
        }
    ];

    const fetchLeaveRequest = async () => {
        const storedData = JSON.parse(localStorage.getItem('leaveRequest')) || []

        // Filter data based on role
        const filteredData = authToken?.role === authToken?.role
            ? (storedData.filter(req => req.role === authToken?.role) && storedData.filter(req => req.employeeId === authToken?.id))
            : storedData;

        if (filteredData.length === 0) {
            // Initialize with default roles if no roles exist
            setLeaveReqToLocalStorage(defaultLeaveRequests);
            setLeaveReqData(defaultLeaveRequests)
        } else {
            setLeaveReqData(filteredData);
        }
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
            employeeId: authToken?.id,
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
