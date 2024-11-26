/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useEmployeeData = () => {
    const [employeeData, setEmployeeData] = useState([])
    const [editEmployeeId, setEditEmployeeId] = useState(null)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deleteTargetId, setDeleteTargetId] = useState(null)
    const [open, setOpen] = useState(false)
    const [scroll, setScroll] = useState('body')
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const theme = useTheme()

    // Handle search input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    // Utility function to get Employee from localStorage
    const getEmployeeFromLocalStorage = () => {
        const storedEmployee = localStorage.getItem('employee')
        return storedEmployee ? JSON.parse(storedEmployee) : []
    }

    // Utility function to set Employee in localStorage
    const setEmployeeToLocalStorage = (emp) => {
        localStorage.setItem('employee', JSON.stringify(emp))
    }

    const handleClose = () => {
        setOpen(false)
        setEditEmployeeId(null)
    }

    // for dialog box
    const handleClickOpen = scrollType => () => {
        setOpen(true)
        setScroll(scrollType)
    }

    const handleEdit = id => {
        setEditEmployeeId(id)
        setOpen(true)
    }

    const fetchData = async () => {
        setLoading(true)
        const employee = getEmployeeFromLocalStorage()
        setEmployeeData(employee)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Function to add form data to localStorage
    const addEmployee = async newEmployee => {
        const employee = getEmployeeFromLocalStorage()

        // Add a unique ID and today's date to each new role
        const updatedEmployee = [...employee, { ...newEmployee, id: Date.now() }]
        setEmployeeToLocalStorage(updatedEmployee)
        setEmployeeData(updatedEmployee)

        toast.success('Employee Added Successfully!', {
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

    const editEmployee = async (updatedData) => {
        const employee = getEmployeeFromLocalStorage()

        // Find the Employee and update it
        const updatedEmployee = employee.map((emp) =>
            emp.id === updatedData.id ? updatedData : emp
        )

        setEmployeeToLocalStorage(updatedEmployee)
        setEmployeeData(updatedEmployee)

        toast.success('Employee Updated Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })

        setOpen(false)
        setEditEmployeeId(null)
    }

    const handleDeleteEmployee = id => {
        setDeleteTargetId(id)
        setDeleteModalOpen(true)
    }

    const confirmDeleteEmployee = () => {
        if (deleteTargetId) {
            deleteEmployee(deleteTargetId)
            setDeleteModalOpen(false)
        }
    }

    const deleteEmployee = async id => {
        // Get the current list of Employee from localStorage
        const employee = getEmployeeFromLocalStorage()

        // Filter out the Employee that needs to be deleted
        const updatedEmployee = employee.filter(emp => emp.id !== id)

        // Update localStorage with the new list
        setEmployeeToLocalStorage(updatedEmployee)

        // Update the state to reflect changes in the UI
        setEmployeeData(updatedEmployee)

        // Show success message
        toast.success('Employee Deleted Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })
    }

    // Function to delete specified employee document data from database
    const deleteDocumentData = async (fileName, empId) => {
        // Get the current list of employee from localStorage
        const employee = getEmployeeFromLocalStorage()

        // Find the employee by id
        const updatedEmployee = employee.map((emp) => {
            if (emp.id === empId) {
                // Remove the document with the matching fileName from the document array
                const updatedDocuments = emp.governmentDocument.filter(doc => doc.path !== fileName)

                return { ...emp, governmentDocument: updatedDocuments }
            }
            return emp
        })

        // Update localStorage with the modified list of employee
        setEmployeeToLocalStorage(updatedEmployee)

        // Update the state to reflect changes in the UI
        setEmployeeData(updatedEmployee)

        // Show success message
        toast.success('Employee Document Deleted Successfully!', {
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
        employeeData,
        editEmployeeId,
        addEmployee,
        editEmployee,
        deleteEmployee,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        deleteDocumentData,
        deleteModalOpen,
        setDeleteModalOpen,
        confirmDeleteEmployee,
        handleDeleteEmployee,
        searchQuery,
        handleSearchChange
    }
}

export default useEmployeeData
