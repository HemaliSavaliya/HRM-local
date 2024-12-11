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

    // Function to initialize departments
    const defaultDepartments = [
        { id: Date.now() + Math.random(), departmentName: 'Human Resources', departmentHead: 'Alice Johnson', departmentEmail: 'alice.johnson@company.com', teamMembers: ['Priya', 'Minal'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
        { id: Date.now() + Math.random(), departmentName: 'Finance', departmentHead: 'Bob Brown', departmentEmail: 'bob.brown@company.com', teamMembers: ['Rahul'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
        { id: Date.now() + Math.random(), departmentName: 'Marketing', departmentHead: 'Carol White', departmentEmail: 'carol.white@company.com', teamMembers: ['Vikas', 'Anjali'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
        { id: Date.now() + Math.random(), departmentName: 'IT', departmentHead: 'Dave Clark', departmentEmail: 'dave.clark@company.com', teamMembers: [], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
        { id: Date.now() + Math.random(), departmentName: 'Sales', departmentHead: 'Eve Martinez', departmentEmail: 'eve.martinez@company.com', teamMembers: ['Suresh', 'Preeti'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
        { id: Date.now() + Math.random(), departmentName: 'Operations', departmentHead: 'Frank Lewis', departmentEmail: 'frank.lewis@company.com', teamMembers: ['Naveen', 'Arpita'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
        { id: Date.now() + Math.random(), departmentName: 'Customer Service', departmentHead: 'Grace Davis', departmentEmail: 'grace.davis@company.com', teamMembers: ['Deepak', 'Aisha'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
        { id: Date.now() + Math.random(), departmentName: 'Legal', departmentHead: 'Hannah Wilson', departmentEmail: 'hannah.wilson@company.com', teamMembers: ['Alok', 'Simran'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
        { id: Date.now() + Math.random(), departmentName: 'Research and Development', departmentHead: 'Isaac Taylor', departmentEmail: 'isaac.taylor@company.com', teamMembers: ['Pankaj'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
        { id: Date.now() + Math.random(), departmentName: 'Procurement', departmentHead: 'Jackie Nelson', departmentEmail: 'jackie.nelson@company.com', teamMembers: [], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') }
    ];

    // const initializeDepartments = () => {
    //     const departments = [
    //         { id: Date.now() + Math.random(), departmentName: 'Human Resources', departmentHead: 'Alice Johnson', departmentEmail: 'alice.johnson@company.com', teamMembers: ['Priya', 'Minal'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
    //         { id: Date.now() + Math.random(), departmentName: 'Finance', departmentHead: 'Bob Brown', departmentEmail: 'bob.brown@company.com', teamMembers: ['Rahul'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
    //         { id: Date.now() + Math.random(), departmentName: 'Marketing', departmentHead: 'Carol White', departmentEmail: 'carol.white@company.com', teamMembers: ['Vikas', 'Anjali'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
    //         { id: Date.now() + Math.random(), departmentName: 'IT', departmentHead: 'Dave Clark', departmentEmail: 'dave.clark@company.com', teamMembers: [], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
    //         { id: Date.now() + Math.random(), departmentName: 'Sales', departmentHead: 'Eve Martinez', departmentEmail: 'eve.martinez@company.com', teamMembers: ['Suresh', 'Preeti'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
    //         { id: Date.now() + Math.random(), departmentName: 'Operations', departmentHead: 'Frank Lewis', departmentEmail: 'frank.lewis@company.com', teamMembers: ['Naveen', 'Arpita'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
    //         { id: Date.now() + Math.random(), departmentName: 'Customer Service', departmentHead: 'Grace Davis', departmentEmail: 'grace.davis@company.com', teamMembers: ['Deepak', 'Aisha'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
    //         { id: Date.now() + Math.random(), departmentName: 'Legal', departmentHead: 'Hannah Wilson', departmentEmail: 'hannah.wilson@company.com', teamMembers: ['Alok', 'Simran'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
    //         { id: Date.now() + Math.random(), departmentName: 'Research and Development', departmentHead: 'Isaac Taylor', departmentEmail: 'isaac.taylor@company.com', teamMembers: ['Pankaj'], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
    //         { id: Date.now() + Math.random(), departmentName: 'Procurement', departmentHead: 'Jackie Nelson', departmentEmail: 'jackie.nelson@company.com', teamMembers: [], status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') }
    //     ];

    //     setDepartmentsToLocalStorage(departments);
    //     setDepartmentData(departments);
    // };

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
        const department = getDepartmentsFromLocalStorage()
        if (department.length === 0) {
            // Initialize with default roles if no roles exist
            setDepartmentsToLocalStorage(defaultDepartments);
            setDepartmentData(defaultDepartments)
        } else {
            setDepartmentData(department)
        }

        setLoading(false)
    }

    // useEffect(() => {
    //     if (!getDepartmentsFromLocalStorage().length) {
    //         initializeDepartments(); // Initialize departments if none exist in localStorage
    //     } else {
    //         fetchDepartment(); // Fetch departments from localStorage
    //     }
    // }, []);

    useEffect(() => {
        fetchDepartment(); // Fetch departments from localStorage
    }, []);

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