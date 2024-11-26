import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import toast from 'react-hot-toast'

const useTabSecurityData = () => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  // ** States
  const [values, setValues] = useState({
    email: authToken?.email,
    newPassword: '',
    showNewPassword: false,
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false
  })
  const theme = useTheme()

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

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

  // Handle Password Change (using localStorage)
  const handlePasswordChange = async e => {
    e.preventDefault()

    // Validate current password
    if (authToken?.password !== values.password) {
      toast.error('Current password is incorrect', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
      return
    }

    // Check if new password and confirm password match
    if (values.newPassword !== values.confirmPassword) {
      toast.error('New password and confirm password do not match', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
      return
    }

    // Update password in localStorage
    const updatedAuth = { ...authToken, password: values.newPassword }
    localStorage.setItem('login-details', JSON.stringify(updatedAuth))

    // Notify success
    toast.success('Password updated successfully!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontSize: '15px'
      }
    })

    // Reset the password fields after successful update
    setValues({ password: '', newPassword: '', confirmPassword: '' })
  }

  return {
    handleCurrentPasswordChange,
    handleClickShowCurrentPassword,
    handleMouseDownCurrentPassword,
    handleNewPasswordChange,
    handleClickShowNewPassword,
    handleMouseDownNewPassword,
    handleConfirmNewPasswordChange,
    handleClickShowConfirmNewPassword,
    handleMouseDownConfirmNewPassword,
    handlePasswordChange,
    values,
    setValues
  }
}

export default useTabSecurityData
