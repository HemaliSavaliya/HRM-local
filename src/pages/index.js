import { Box } from '@mui/material'
import React from 'react'
import AdminDashboard from 'src/views/dashboard/Admin/AdminDashboard'
import EmployeeDashboard from 'src/views/dashboard/Employee/EmployeeDashboard'
import HRDashboard from 'src/views/dashboard/HR/HRDashboard'

const Dashboard = () => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const role = authToken?.role

  return (
    <Box>
      {role === 'admin' && <AdminDashboard />}
      {role === 'hr' && <HRDashboard />}
      {role === 'employee' && <EmployeeDashboard />}
    </Box>
  )
}

export default Dashboard
