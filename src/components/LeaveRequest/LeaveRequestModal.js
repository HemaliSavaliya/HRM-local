import { Box, Dialog, DialogContent, DialogTitle, Typography, Button, useTheme } from '@mui/material'
import LeaveRequestForm from './LeaveRequestForm'
import { motion } from 'framer-motion'

const LeaveRequestModal = ({ leaveReqData, open, setOpen, scroll, handleClickOpen, handleClose, addLeaveRequest }) => {
    const theme = useTheme()

    return (
        <>
            <Button
                component={motion.div}
                whileHover={{
                    scale: 0.9,
                    transition: { duration: 0.4 }
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exist={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.25 }}
                variant='contained'
                onClick={handleClickOpen('body')}
                sx={{
                    lineHeight: 0,
                    padding: '20px 25px',
                    '&.MuiButton-root:hover': {
                        backgroundColor: theme.palette.primary.hover
                    }
                }}
            >
                Apply for Leave
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogTitle id='scroll-dialog-title'>
                    <Typography fontWeight={600}>Add Leave Requests</Typography>
                </DialogTitle>
                <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
                    <LeaveRequestForm
                        handleClose={handleClose}
                        leaveReqData={leaveReqData}
                        setOpen={setOpen}
                        addLeaveRequest={addLeaveRequest}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default LeaveRequestModal