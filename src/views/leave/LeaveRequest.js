import React from 'react'
import {
    Card,
    Box,
    TextField
} from '@mui/material'
import useLeaveReqData from 'src/hooks/useLeaveReqData'
import LeaveRequestModal from 'src/components/LeaveRequest/LeaveRequestModal'
import { Toaster } from 'react-hot-toast'
import LeaveReqTable from './LeaveRequestTable'
import { inputField, inputLabel } from 'src/Styles'

const LeaveRequest = () => {
    const {
        loading,
        leaveReqData,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        addLeaveRequest,
        searchQuery,
        handleSearchChange
    } = useLeaveReqData()

    return (
        <>
            <Toaster />

            <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
                <Box
                    sx={{
                        width: '100%',
                        display: { xs: 'grid', sm: 'flex', lg: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                    mb={4}
                >
                    <LeaveRequestModal
                        leaveReqData={leaveReqData}
                        open={open}
                        setOpen={setOpen}
                        scroll={scroll}
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}
                        addLeaveRequest={addLeaveRequest}
                    />
                    <TextField
                        sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...inputField, ...inputLabel }}
                        label='Search Leave Request'
                        variant='filled'
                        size='small'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Box>

                <LeaveReqTable
                    searchQuery={searchQuery}
                    leaveReqData={leaveReqData}
                    loading={loading}
                />
            </Card>
        </>
    )
}

export default LeaveRequest
