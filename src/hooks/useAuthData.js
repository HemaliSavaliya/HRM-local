/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useAuth = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
    role: '',
    name: ''
  })

  const router = useRouter()
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleRadioChange = event => {
    const selectedRole = event.target.value
    let email = ''
    let password = ''
    let name = ''

    switch (selectedRole) {
      case 'admin':
        email = 'admin@admin.com'
        password = 'admin@123'
        name = 'Admin'
        break
      case 'hr':
        email = 'hr@hr.com'
        password = 'hr@123'
        name = 'HR'
        break
      case 'employee':
        email = 'employee@employee.com'
        password = 'employee@123'
        name = 'Employee'
        break
      default:
        break
    }

    setValues({ ...values, role: selectedRole, email, password, name })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsSaving(true)

    const { email, password, role, name } = values

    try {
      // Retrieve employee data from localStorage
      const employees = JSON.parse(localStorage.getItem('employee')) || [];

      // Find the logged-in user by email and password
      const loggedInUser = employees.find(
        (user) => user.email === email && user.password === password
      );

      // Store the login details in local storage
      localStorage.setItem('login-details', JSON.stringify({
        email,
        password,
        role,
        name: loggedInUser ? loggedInUser.name : name,
        id: loggedInUser ? loggedInUser.id : ''
      }))
 
      // Display success toast upon successful login
      toast.success('Login successful!', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })

      // Optional: You can navigate to a different page after storing the data
      router.push('/');
    } catch (error) {
      // Display error toast upon login failure
      toast.error('Login failed. Please try again.', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return {
    isSaving,
    values,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleRadioChange,
    handleSubmit,
    handleKeyDown
  }
}

export default useAuth
