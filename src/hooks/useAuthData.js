/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
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

    // Store the login details in local storage
    localStorage.setItem('login-details', JSON.stringify({ email, password, role, name }))

    // Optional: You can navigate to a different page after storing the data
    router.push('/');

    setIsSaving(false)
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
