import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useRoleData = () => {
    const [roleData, setRoleData] = useState([])
    const [editRoleId, setEditRoleId] = useState(null)
    const [open, setOpen] = useState(false)
    const [scroll, setScroll] = useState('body')
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const theme = useTheme()

    // Handle search input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    // Utility function to get roles from localStorage
    const getRolesFromLocalStorage = () => {
        const storedRoles = localStorage.getItem('roles')
        return storedRoles ? JSON.parse(storedRoles) : []
    }

    // Utility function to set roles in localStorage
    const setRolesToLocalStorage = (roles) => {
        localStorage.setItem('roles', JSON.stringify(roles))
    }

    const handleClose = () => {
        setOpen(false)
        setEditRoleId(null)
    }

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true)
        setScroll(scrollType)
    }

    // Fetch roles from localStorage
    const fetchRole = () => {
        setLoading(true)
        const roles = getRolesFromLocalStorage()
        setRoleData(roles)
        setLoading(false)
    }

    useEffect(() => {
        fetchRole() // Fetch roles from localStorage when component mounts
    }, [])

    // Function to add role to localStorage
    const addRole = (newRole) => {
        const roles = getRolesFromLocalStorage()

        // Get today's date in DD/MM/YYYY format
        const today = new Date().toLocaleDateString('en-GB')

        // Add a unique ID and today's date to each new role
        const updatedRoles = [...roles, { ...newRole, id: Date.now(), date: today }]
        setRolesToLocalStorage(updatedRoles)
        setRoleData(updatedRoles)

        toast.success('Role Added Successfully!', {
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

    // Function to edit role in localStorage
    const editRole = (updatedRole) => {
        const roles = getRolesFromLocalStorage()

        // Find the role and update it
        const updatedRoles = roles.map((role) =>
            role.id === updatedRole.id ? updatedRole : role
        )

        setRolesToLocalStorage(updatedRoles)
        setRoleData(updatedRoles)

        toast.success('Role Updated Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })

        setOpen(false)
        setEditRoleId(null)
    }

    // Function to delete role from localStorage
    const deleteRole = (roleId) => {
        const roles = getRolesFromLocalStorage()

        // Remove the role by filtering it out
        const updatedRoles = roles.filter((role) => role.id !== roleId)
        setRolesToLocalStorage(updatedRoles)
        setRoleData(updatedRoles)

        toast.success('Role Deleted Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })
    }

    // Function to toggle status of the role
    const updateRoleStatus = (id, newStatus) => {
        const roles = getRolesFromLocalStorage()

        const updatedRoles = roles.map((role) =>
            role.id === id ? { ...role, status: newStatus } : role
        )

        setRolesToLocalStorage(updatedRoles)
        setRoleData(updatedRoles)

        toast.success('Role Status Updated!', {
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
        roleData,
        editRoleId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        addRole,
        editRole,
        deleteRole,
        updateRoleStatus,
        searchQuery,
        handleSearchChange
    }
}

export default useRoleData
