import { useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useTabInfoData = () => {
    const [date, setDate] = useState(null)
    const [dateJon, setDateJon] = useState(null)
    const [imgSrc, setImgSrc] = useState(null)
    const [authToken, setAuthToken] = useState(null)
    const theme = useTheme()
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        email: '',
        mobileNo: '',
        address: '',
        department: '',
        designation: '',
        salary: '',
        bankAccountHolderName: '',
        bankAccountNumber: '',
        bankName: '',
        bankIFSCCode: '',
        bankBranchLocation: '',
        birthDate: '',
        joiningDate: '',
        profileImage: null
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const authToken = JSON.parse(localStorage.getItem('login-details'))
            if (authToken) {
                setAuthToken(authToken)
            }
        }
    }, [])

    useEffect(() => {
        if (authToken?.role === "admin") {
            // Admin-specific logic
            const adminData = JSON.parse(localStorage.getItem('admin-data')) || {}
            setImgSrc(adminData.profileImage || null)
        } else if (authToken?.email) {
            const employees = JSON.parse(localStorage.getItem('employee')) || []
            const currentUser = employees.find(employee => employee.email === authToken.email)

            if (currentUser) {
                setUserData(currentUser)
                setDate(new Date(currentUser.birthDate))
                setDateJon(new Date(currentUser.joiningDate))
                setImgSrc(currentUser.profileImage || null)
            }
        }
    }, [authToken])

    const handleChange = e => {
        const { name, value } = e.target
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    // Function for update user data
    const updateUserData = async updatedUserData => {
        try {
            const employees = JSON.parse(localStorage.getItem('employee')) || []
            const updatedEmployees = employees.map(employee =>
                employee.email === authToken?.email ? { ...employee, ...updatedUserData } : employee
            )

            // Save updated data back to localStorage
            localStorage.setItem('employee', JSON.stringify(updatedEmployees))
            setUserData(updatedUserData)

            toast.success('Employee data updated successfully!', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: '15px'
                }
            })
        } catch (error) {
            toast.error('Error updating employee data. Please try again.', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: '15px'
                }
            })
        }
    }

    // Function to handle profile image upload and update
    const handleProfileImageUpload = e => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const profileImage = reader.result

                if (authToken?.role === 'admin') {
                    updateAdminProfileImage(profileImage)
                } else {
                    updateProfileImageInLocalStorage(profileImage)
                }
            }
            reader.readAsDataURL(file)
        } else {
            toast.error('No file selected!', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: '15px'
                }
            })
        }
    }

    // Update admin profile image in localStorage
    const updateAdminProfileImage = (profileImage) => {
        try {
            const adminData = JSON.parse(localStorage.getItem('admin-data')) || {}
            const updateAdminData = {
                ...adminData, profileImage
            }

            localStorage.setItem('admin-data', JSON.stringify(updateAdminData))
            setImgSrc(profileImage)

            toast.success('Admin profile image updated successfully!', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: '15px'
                }
            })
        } catch (error) {
            toast.error('Error updating admin profile image. Please try again.', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: '15px'
                }
            })
        }
    }

    // Update profile image in localStorage and userData
    const updateProfileImageInLocalStorage = (profileImage) => {
        try {
            const updatedUserData = { ...userData, profileImage }
            setUserData(updatedUserData)

            const employees = JSON.parse(localStorage.getItem('employee')) || []
            const updatedEmployees = employees.map(employee =>
                employee.email === authToken?.email ? updatedUserData : employee
            )

            localStorage.setItem('employee', JSON.stringify(updatedEmployees))
            setImgSrc(profileImage)

            toast.success('Profile image updated successfully!', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: '15px'
                }
            })
        } catch (error) {
            console.error('Error updating profile image:', error)
            toast.error('Error updating profile image. Please try again.', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: '15px'
                }
            })
        }
    }

    // Save all changes (image + user data)
    const handleSaveChanges = async () => {
        try {
            await updateUserData(userData) // Save user data
        } catch (error) {
            console.error('Error saving changes:', error)
        }
    }

    // Reset profile image to null
    const resetProfileImage = async () => {
        if (authToken?.role === 'admin') {
            localStorage.setItem('admin-data', JSON.stringify({ profileImage: null }))
            setImgSrc(null)
        } else {
            const updatedUserData = { ...userData, profileImage: null }
            setUserData(updatedUserData)

            const employees = JSON.parse(localStorage.getItem('employee')) || []
            const updatedEmployees = employees.map(employee =>
                employee.email === authToken?.email ? updatedUserData : employee
            )

            localStorage.setItem('employee', JSON.stringify(updatedEmployees))
            setImgSrc(null)
        }

        toast.success('Profile image reset successfully!', {
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
        date,
        dateJon,
        setDateJon,
        imgSrc,
        authToken,
        handleChange,
        handleProfileImageUpload,
        handleSaveChanges,
        resetProfileImage,
        userData
    }
}

export default useTabInfoData
