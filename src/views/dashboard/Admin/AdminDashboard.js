import { Box, Grid, List, ListItem, Typography } from '@mui/material'
import { ChevronRight } from 'mdi-material-ui'
import React from 'react'
import WelcomeCard from './WelcomeCard'
import Attendance from './Attendance'
import TotalProjects from './TotalProjects'
import TotalClient from './TotalClient'
import TotalTask from './TotalTask'
import TotalEarning from './TotalEarning'
import TotalProfit from './ProfitWeek'
import JobApplicants from './JobApplicants'
import NewHire from './NewHire'

const AdminDashboard = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Box>
                    <Typography fontWeight={600} fontSize={'16px'}>Admin</Typography>
                </Box>
                <List sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '1rem', fontWeight: 'normal', padding: 0 }}>
                    <ListItem sx={{ color: 'text.primary', padding: 0, fontSize: 14 }}>Dashboard</ListItem>
                    <ChevronRight sx={{ fontSize: 14 }} />
                    <ListItem sx={{ color: 'text.primary', padding: 0, fontSize: 14 }}>Admin</ListItem>
                </List>
            </Box>

            <WelcomeCard />

            <Grid container spacing={5} mt={3}>
                <Grid item xs={12} md={6} lg={3}><Attendance /></Grid>
                <Grid item xs={12} md={6} lg={3}><TotalProjects /></Grid>
                <Grid item xs={12} md={6} lg={3}><TotalClient /></Grid>
                <Grid item xs={12} md={6} lg={3}><TotalTask /></Grid>
                <Grid item xs={12} md={6} lg={3}><TotalEarning /></Grid>
                <Grid item xs={12} md={6} lg={3}><TotalProfit /></Grid>
                <Grid item xs={12} md={6} lg={3}><JobApplicants /></Grid>
                <Grid item xs={12} md={6} lg={3}><NewHire /></Grid>
            </Grid>
        </Box>
    )
}

export default AdminDashboard
