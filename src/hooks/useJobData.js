
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useJobData = () => {
    const [jobData, setJobData] = useState([])
    const [editJobId, setEditJobId] = useState(null)
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

    // Utility function to get job from localStorage
    const getJobFromLocalStorage = () => {
        const storedJob = localStorage.getItem('job')
        return storedJob ? JSON.parse(storedJob) : []
    }

    // Utility function to set job in localStorage
    const setJobToLocalStorage = (job) => {
        localStorage.setItem('job', JSON.stringify(job))
    }

    const handleClose = () => {
        setOpen(false)
        setEditJobId(null)
    }

    // For Edit data
    const handleEdit = id => {
        setEditJobId(id)
        setOpen(true)
    }

    // for dialog box
    const handleClickOpen = scrollType => () => {
        setOpen(true)
        setScroll(scrollType)
    }

    const fetchJobs = async () => {
        setLoading(true)
        const jobs = getJobFromLocalStorage()
        setJobData(jobs)
        setLoading(false)
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    // Function to add form data to localStorage
    const addJobs = async newJobs => {
        const job = getJobFromLocalStorage()

        // Add a unique ID and today's date to each new role
        const updatedJobs = [...job, { ...newJobs, id: Date.now() }]
        setJobToLocalStorage(updatedJobs)
        setJobData(updatedJobs)

        toast.success('Job Added Successfully!', {
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
    const editJobs = async (updatedData, jobId) => {
        const job = getJobFromLocalStorage()

        // Find the job and update it
        const updatedJobs = job.map((job) =>
            job.id === updatedData.id ? updatedData : job
        )

        setJobToLocalStorage(updatedJobs)
        setJobData(updatedJobs)

        toast.success('Jobs Updated Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })

        setOpen(false)
        setEditJobId(null)
    }

    const handleDeleteJobs = id => {
        setDeleteTargetId(id)
        setDeleteModalOpen(true)
    }

    const confirmDeleteJobs = () => {
        if (deleteTargetId) {
            deleteJobs(deleteTargetId)
            setDeleteModalOpen(false)
        }
    }

    // Function to delete form data to localStorage
    const deleteJobs = async id => {
        // Get the current list of jobs from localStorage
        const jobs = getJobFromLocalStorage()

        // Filter out the job that needs to be deleted
        const updatedJobs = jobs.filter(job => job.id !== id)

        // Update localStorage with the new list
        setJobToLocalStorage(updatedJobs)

        // Update the state to reflect changes in the UI
        setJobData(updatedJobs)

        // Show success message
        toast.success('Job Deleted Successfully!', {
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
        jobData,
        editJobId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        addJobs,
        editJobs,
        deleteJobs,
        deleteModalOpen,
        setDeleteModalOpen,
        confirmDeleteJobs,
        handleDeleteJobs,
        searchQuery,
        handleSearchChange
    }
}

export default useJobData
