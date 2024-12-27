import { Alert, Box, Grid, IconButton, List, ListItem, Typography } from '@mui/material'
import { ChevronRight, Close } from 'mdi-material-ui'
import React, { useState } from 'react'
import UserInfo from './UserInfo';
import LeaveDetail from './LeaveDetail';
import LeaveInfo from './LeaveInfo';
import AttendanceCard from './AttendanceCard';

const EmployeeDashboard = () => {
    const [open, setOpen] = useState(true);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 5 }}>
                <Box>
                    <Typography fontWeight={600} fontSize={'16px'}>Employee</Typography>
                </Box>
                <List sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '1rem', fontWeight: 'normal', padding: 0 }}>
                    <ListItem sx={{ color: 'text.primary', padding: 0, fontSize: 14 }}>Dashboard</ListItem>
                    <ChevronRight sx={{ fontSize: 14 }} />
                    <ListItem sx={{ color: 'text.primary', padding: 0, fontSize: 14 }}>Employee</ListItem>
                </List>
            </Box>

            {/* alert */}
            {open && (
                <Alert
                    severity="info"
                    style={{
                        backgroundColor: '#EDF2F4',
                        color: "#3B7080",
                        marginBottom: '24px',
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                    }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setOpen(false)}
                            sx={{ color: '#3B7080' }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    Your Leave Request on “24th April 2024” has been Approved!!!
                </Alert>
            )}

            {/* cards */}
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6} md={6} lg={3}><UserInfo /></Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}><LeaveDetail /></Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}><LeaveInfo /></Grid>
            </Grid>

            <Grid container spacing={2} mt={5}>
                {/* First Column */}
                <Grid item xs={12} xl={4} lg={4} md={4}><AttendanceCard /></Grid>

                {/* Second Column */}
                <Grid item xs={12} xl={8} container spacing={2} display="flex">
                    <Grid item xs={12} md={6} lg={6} xl={3}></Grid>
                    <Grid item xs={12} md={6} lg={6} xl={3}></Grid>
                    <Grid item xs={12} md={6} lg={6} xl={3}></Grid>
                    <Grid item xs={12} md={6} lg={6} xl={3}></Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default EmployeeDashboard
