import { Grid, styled, Typography } from '@mui/material'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <Typography variant='h6' fontWeight={700}>
        Dashboard
      </Typography>
      <Grid item xs={12} md={6} lg={12} mt={5}>
        <Grid container spacing={6}>

        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
