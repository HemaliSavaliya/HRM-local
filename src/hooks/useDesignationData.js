/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useDesignationData = () => {
    const [designationData, setDesignationData] = useState([])
    const [editDesignationId, setEditDesignationId] = useState(null)
    const [open, setOpen] = useState(false)
    const [scroll, setScroll] = useState('body')
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const theme = useTheme()

    // Handle search input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    // Utility function to get designation from localStorage
    const getDesignationFromLocalStorage = () => {
        const storedDesignation = localStorage.getItem('designation')
        return storedDesignation ? JSON.parse(storedDesignation) : []
    }

    // Utility function to set designation in localStorage
    const setDesignationToLocalStorage = (designation) => {
        localStorage.setItem('designation', JSON.stringify(designation))
    }

    const handleClose = () => {
        setOpen(false)
        setEditDesignationId(null)
    }

    // for dialog box
    const handleClickOpen = scrollType => () => {
        setOpen(true)
        setScroll(scrollType)
    }

    // Function to initialize designations 
    const initializeDesignations = () => {
        const designations = [
            { id: Date.now() + Math.random(), designationName: 'HR Manager', status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
            { id: Date.now() + Math.random(), designationName: 'Finance Manager', status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
            { id: Date.now() + Math.random(), designationName: 'Marketing Manager', status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
            { id: Date.now() + Math.random(), designationName: 'IT Manager', status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
            { id: Date.now() + Math.random(), designationName: 'Sales Manager', status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
            { id: Date.now() + Math.random(), designationName: 'Operations Manager', status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
            { id: Date.now() + Math.random(), designationName: 'Customer Service Manager', status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
            { id: Date.now() + Math.random(), designationName: 'Legal Manager', status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
            { id: Date.now() + Math.random(), designationName: 'R&D Manager', status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') },
            { id: Date.now() + Math.random(), designationName: 'Procurement Manager', status: 'Active', startingDate: new Date().toLocaleDateString('en-GB') }];

        setDesignationToLocalStorage(designations);
        setDesignationData(designations);
    };

    const fetchDesignation = async () => {
        const designation = getDesignationFromLocalStorage()
        setDesignationData(designation)
        setLoading(false)
    }

    useEffect(() => {
        if (!getDesignationFromLocalStorage().length) {
            initializeDesignations(); // Initialize designation if none exist in localStorage
        } else {
            fetchDesignation()
        }
    }, [])

    // Function to add from data to localStorage
    const addDesignation = async newDesignation => {
        const designation = getDesignationFromLocalStorage()

        // Get today's date in DD/MM/YYYY format
        const today = new Date().toLocaleDateString('en-GB')

        // Add a unique ID and today's date to each new role
        const updatedDesignation = [...designation, { ...newDesignation, id: Date.now(), startingDate: today }]
        setDesignationToLocalStorage(updatedDesignation)
        setDesignationData(updatedDesignation)

        toast.success('Designation Added Successfully!', {
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

    // Function for toggle status
    const updateDesignationStatus = async (id, newStatus) => {
        const designation = getDesignationFromLocalStorage()

        const updatedDesignation = designation.map((des) =>
            des.id === id ? { ...des, status: newStatus } : des
        )

        setDesignationToLocalStorage(updatedDesignation)
        setDesignationData(updatedDesignation)

        toast.success('Designation Status Updated!', {
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
        designationData,
        editDesignationId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        addDesignation,
        updateDesignationStatus,
        searchQuery,
        handleSearchChange
    }
}

export default useDesignationData