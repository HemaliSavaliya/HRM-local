/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useDepartmentData = () => {
    const [departmentData, setDepartmentData] = useState([])
    const [editDepartId, setEditDepartId] = useState(null)
    const [open, setOpen] = useState(false)
    const [scroll, setScroll] = useState('body')
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const theme = useTheme()

    // Handle search input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    // Utility function to get department from localStorage
    const getDepartmentsFromLocalStorage = () => {
        const storedDepartment = localStorage.getItem('department')
        return storedDepartment ? JSON.parse(storedDepartment) : []
    }

    // Utility function to set department in localStorage
    const setDepartmentsToLocalStorage = (department) => {
        localStorage.setItem('department', JSON.stringify(department))
    }

    const handleClose = () => {
        setOpen(false)
        setEditDepartId(null)
    }

    // For Edit Data
    const handleEdit = id => {
        setEditDepartId(id)
        setOpen(true)
    }

    // for dialog box
    const handleClickOpen = scrollType => () => {
        setOpen(true)
        setScroll(scrollType)
    }

    // Function for toggle status
    const updateDepartmentStatus = async (id, newStatus) => {
        const department = getDepartmentsFromLocalStorage()

        const updatedDepartment = department.map((dept) =>
            dept.id === id ? { ...dept, status: newStatus } : dept
        )

        setDepartmentsToLocalStorage(updatedDepartment)
        setDepartmentData(updatedDepartment)

        toast.success('Department Status Updated!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })
    }

    // Fetch department from localStorage
    const fetchDepartment = () => {
        setLoading(true)
        const department = getDepartmentsFromLocalStorage()
        setDepartmentData(department)
        setLoading(false)
    }

    useEffect(() => {
        fetchDepartment() // Fetch department from localStorage when component mounts
    }, [])

    // Function to add from data to localStorage
    const addDepartments = async newDepartment => {
        const department = getDepartmentsFromLocalStorage()

        // Get today's date in DD/MM/YYYY format
        const today = new Date().toLocaleDateString('en-GB')

        // Add a unique ID and today's date to each new role
        const updatedDepartment = [...department, { ...newDepartment, id: Date.now(), startingDate: today }]
        setDepartmentsToLocalStorage(updatedDepartment)
        setDepartmentData(updatedDepartment)

        toast.success('Department Added Successfully!', {
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

    // Function to update from data to localStorage
    const editDepartments = async (updatedData) => {
        const department = getDepartmentsFromLocalStorage()

        // Find the role and update it
        const updatedDepartment = department.map((dept) =>
            dept.id === updatedData.id ? updatedData : dept
        )

        setDepartmentsToLocalStorage(updatedDepartment)
        setDepartmentData(updatedDepartment)

        toast.success('Department Updated Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })

        setOpen(false)
        setEditDepartId(null)
    }

    return {
        loading,
        departmentData,
        editDepartId,
        open,
        setOpen,
        scroll,
        handleEdit,
        handleClickOpen,
        handleClose,
        addDepartments,
        editDepartments,
        updateDepartmentStatus,
        searchQuery,
        handleSearchChange
    }
}

export default useDepartmentData