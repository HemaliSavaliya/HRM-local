import { Box, Typography } from '@mui/material'
import React from 'react'
import HRDashboard from 'src/views/dashboard/HRDashboard'

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
        <Box>
          <Typography>Employee dashboard</Typography>
        </Box>
      )}
    </Box>
  )
}

export default Dashboard
