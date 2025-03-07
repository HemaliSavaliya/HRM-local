import React, { useEffect, useState } from 'react'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import { Box, Tooltip, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import Tracker from '../tracker'
import AttendanceTable from 'src/components/Attendance/AttendanceTable'
import RoleWiseAttendance from 'src/views/attendance/RoleWiseAttendance'
import { CoPresentIcon, TimeQuarterIcon } from 'hugeicons-react'

const Tab = styled(MuiTab)(({ theme }) => ({
    lineHeight: 1,
    '&.Mui-selected': {
        fontWeight: 800 // Font weight for selected tab
    },
    [theme.breakpoints.down('md')]: {
        minWidth: 100
    },
    [theme.breakpoints.down('sm')]: {
        minWidth: 67
    }
}))

const TabName = styled('span')(({ theme }) => ({
    // lineHeight: 1.71,
    fontSize: '0.875rem',
    marginLeft: theme.spacing(2.4),
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}))

const Attendance = () => {
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)
    const theme = useTheme()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const authToken = JSON.parse(localStorage.getItem('login-details'))
            if (authToken) {
                setRole(authToken?.role)
            }
        }
    }, [])

    // ** State
    const [value, setValue] = useState('tracker')

    useEffect(() => {
        if (role) {
            if (role === 'hr' || role === 'employee') {
                setValue('tracker')
            } else {
                setValue('role-attendance')
            }
        }
    }, [role])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh'
                }}
            >
                <img src='/images/loader.svg' alt='loader' />
            </div>
        )
    }

    return (
        <TabContext value={value}>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exist={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.25 }}
            >
                <Box
                    sx={{
                        borderTop: `1px solid ${theme.palette.customColors.borderPrimary}`,
                        borderBottom: `1px solid ${theme.palette.customColors.borderPrimary}`,
                        borderRadius: '12px'
                    }}
                >
                    <TabList onChange={handleChange} aria-label='account-settings tabs' indicatorColor='none'>
                        {(role === 'hr' || role === 'employee') && (
                            <Tab
                                value='tracker'
                                label={
                                    <Tooltip title='Tracker'>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <TimeQuarterIcon />
                                            <TabName>Tracker</TabName>
                                        </Box>
                                    </Tooltip>
                                }
                            />
                        )}
                        {role !== 'employee' && (
                            <Tab
                                value='role-attendance'
                                label={
                                    <Tooltip title='Role Wise Attendance'>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CoPresentIcon />
                                            <TabName>Role Wise Attendance</TabName>
                                        </Box>
                                    </Tooltip>
                                }
                            />
                        )}
                    </TabList>
                </Box>
            </motion.div>

            {(role === 'hr' || role === 'employee') && (
                <TabPanel sx={{ p: 0 }} value='tracker'>
                    <Tracker />
                    <AttendanceTable />
                </TabPanel>
            )}

            {role !== 'employee' && (
                <TabPanel sx={{ p: 0 }} value='role-attendance'>
                    <RoleWiseAttendance />
                </TabPanel>
            )}
        </TabContext >
    )
}

export default Attendance
