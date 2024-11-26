import React, { useEffect, useState } from 'react'
import { Box, Card, Tooltip, useTheme } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import ListStatus from 'mdi-material-ui/ListStatus'
import ScaleBalance from 'mdi-material-ui/ScaleBalance'
import ApplicationImport from 'mdi-material-ui/ApplicationImport'
import NoteEditOutline from 'mdi-material-ui/NoteEditOutline'
import LeaveRequest from 'src/views/leave/LeaveRequest'
import AllLeaveRequest from 'src/views/leave/AllLeaveRequest'
import LeaveBalance from 'src/views/leave/LeaveBalance'
import LeaveType from 'src/views/leave/LeaveType'
import { motion } from 'framer-motion'

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

const LeaveManagement = () => {
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState('')
    const theme = useTheme()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const authToken = JSON.parse(localStorage.getItem('login-details'))
            if (authToken) {
                setRole(authToken?.role)
            }
        }
    }, [])

    useEffect(() => {
        if (role) {
            if (role === 'hr' || role === 'admin') {
                setValue('leave-request')
            } else {
                setValue('add-request')
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
                        {role !== 'employee' && (
                            <Tab
                                value='leave-request'
                                label={
                                    <Tooltip title='All Leave Request'>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ApplicationImport />
                                            <TabName>All Leave Request</TabName>
                                        </Box>
                                    </Tooltip>
                                }
                            />
                        )}
                        {role !== 'admin' && (
                            <Tab
                                value='add-request'
                                label={
                                    <Tooltip title='Leave Request'>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <NoteEditOutline />
                                            <TabName>Leave Request</TabName>
                                        </Box>
                                    </Tooltip>
                                }
                            />
                        )}
                        {role !== 'admin' && (
                            <Tab
                                value='leave-balance'
                                label={
                                    <Tooltip title='Leave Balance'>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ScaleBalance />
                                            <TabName>Leave Balance</TabName>
                                        </Box>
                                    </Tooltip>
                                }
                            />
                        )}
                        {role !== 'employee' && (
                            <Tab
                                value='leave-type'
                                label={
                                    <Tooltip title='Leave Type'>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ListStatus />
                                            <TabName>Leave Type</TabName>
                                        </Box>
                                    </Tooltip>
                                }
                            />
                        )}
                    </TabList>
                </Box>
            </motion.div>

            {role !== 'employee' && (
                <TabPanel sx={{ p: 0 }} value='leave-request'>
                    <AllLeaveRequest />
                </TabPanel>
            )}

            {role !== 'admin' && (
                <TabPanel sx={{ p: 0 }} value='add-request'>
                    <LeaveRequest />
                </TabPanel>
            )}

            {role !== 'admin' && (
                <TabPanel sx={{ p: 0 }} value='leave-balance'>
                    <LeaveBalance />
                </TabPanel>
            )}

            {role !== 'employee' && (
                <TabPanel sx={{ p: 0 }} value='leave-type'>
                    <LeaveType />
                </TabPanel>
            )}
        </TabContext>
    )
}

export default LeaveManagement
