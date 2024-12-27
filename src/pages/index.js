import { Box, Typography } from '@mui/material'
import React from 'react'
import EmployeeDashboard from 'src/views/dashboard/Employee/EmployeeDashboard'
import HRDashboard from 'src/views/dashboard/HR/HRDashboard'

const Dashboard = () => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const role = authToken?.role

  return (
    <Box>
      {role === 'admin' && (
        <Box>
          <Typography>Admin dashboard</Typography>
        </Box>
      )}

      {role === 'hr' && (
        <HRDashboard />
      )}

      {role === 'employee' && (
        <EmployeeDashboard />
      )}
    </Box>
  )
}

export default Dashboard
