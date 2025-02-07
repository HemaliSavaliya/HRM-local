
import { Dialog, DialogContent, DialogTitle, Typography, Button, Box, useTheme } from '@mui/material'
import AnnouncementForm from './AnnouncementForm'
import { motion } from 'framer-motion'
import { saveButton } from 'src/Styles'
import { PlusSignIcon } from 'hugeicons-react'

const AnnouncementModal = ({
    editAnnoId,
    announcementData,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    addAnnouncement,
    editAnnouncement
}) => {
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
    const role = authToken?.role
    const theme = useTheme()

    return (
        <>
            {(role === 'admin' || role === "hr") && (
                <Button
                    variant='contained'
                    onClick={handleClickOpen('body')}
                    sx={{
                        ...saveButton,
                        gap: 1,
                        '&.MuiButton-root:hover': {
                            backgroundColor: theme.palette.primary.hover
                        }
                    }}
                >
                    Add Announcements <PlusSignIcon size={15} />
                </Button>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogTitle id='scroll-dialog-title'>
                    <Typography fontWeight={600}>{editAnnoId ? 'Edit Announcements' : 'Add Announcements'}</Typography>
                </DialogTitle>
                <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
                    <AnnouncementForm
                        handleClose={handleClose}
                        editAnnoId={editAnnoId}
                        announcementData={announcementData}
                        setOpen={setOpen}
                        addAnnouncement={addAnnouncement}
                        editAnnouncement={editAnnouncement}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AnnouncementModal
