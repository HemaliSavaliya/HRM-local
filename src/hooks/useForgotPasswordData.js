/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@emotion/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useForgotPasswordData = () => {
  // ** States
  const [values, setValues] = useState({
    employeeId: '',
    newPassword: '',
    showNewPassword: false,
    confirmPassword: '',
    showConfirmPassword: false
  })
  const [userPassword, setUserPassword] = useState([])
  const theme = useTheme()

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  const handleEmployeeName = prop => event => {
    // Find the user by name and update employeeId
    const selectedUser = userPassword.find(user => user.name === event.target.value)
    if (selectedUser) {
      setValues({ ...values, [prop]: event.target.value, employeeId: selectedUser.id })
    }
  }

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        // Fetch user data from localStorage
        const storedUsers = JSON.parse(localStorage.getItem('employee')) || []

        // Check if the logged-in user is an admin
        const loginDetails = JSON.parse(localStorage.getItem('login-details'))
        let filteredUsers = storedUsers

        if (loginDetails?.role === 'admin') {
          // Admin: Include only HR and Employee roles
          filteredUsers = storedUsers.filter(
            user => user.role !== 'admin' && (user.role === 'hr' || user.role === 'employee')
          )
        } else {
          // Non-Admin: Include only Employee roles
          filteredUsers = storedUsers.filter(user => user.role === 'employee')
        }

        setUserPassword(filteredUsers)
      } catch (error) {
        console.error('Error fetching user list', error)
      }
    }
    fetchUserList()
  }, [])

  const handleChangePassword = async () => {
    try {
      // Update password logic (you might need to handle this in localStorage too)
      const storedUsers = JSON.parse(localStorage.getItem('employee')) || []
      const updatedUsers = storedUsers.map(user =>
        user.id === values.employeeId
          ? { ...user, password: values.newPassword } // Update password for the selected user
          : user
      )

      localStorage.setItem('employee', JSON.stringify(updatedUsers))

      // Reset form after success
      setValues({
        employeeId: '',
        newPassword: '',
        showNewPassword: false,
        confirmPassword: '',
        showConfirmPassword: false
      })

      toast.success('Employee/HR Password Updated Successfully!', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    } catch (error) {
      console.error('Error updating password:', error)
      toast.error('Error Updating Employee/HR Password. Please try again.', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    }
  }

  return {
    handleNewPasswordChange,
    handleClickShowNewPassword,
    handleMouseDownNewPassword,
    handleConfirmNewPasswordChange,
    handleClickShowConfirmNewPassword,
    handleMouseDownConfirmNewPassword,
    handleEmployeeName,
    handleChangePassword,
    values,
    setValues,
    userPassword
  }
}

export default useForgotPasswordData
