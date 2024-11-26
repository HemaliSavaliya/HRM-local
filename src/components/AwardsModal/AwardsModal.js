import AwardsForm from './AwardsForm'
import { Dialog, DialogContent, DialogTitle, Typography, Button, Box, useTheme } from '@mui/material'
import { motion } from 'framer-motion'

const AwardsModal = ({
    editAwardId,
    awardsData,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    addAwards,
    editAwards
}) => {
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
    const role = authToken?.role
    const theme = useTheme()

    return (
        <>
            {role === 'employee' ? null : (
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
                    Add Awards
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
                    <Typography fontWeight={600}>{editAwardId ? 'Edit Awards' : 'Add Awards'}</Typography>
                </DialogTitle>
                <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
                    <AwardsForm
                        handleClose={handleClose}
                        editAwardId={editAwardId}
                        awardsData={awardsData}
                        setOpen={setOpen}
                        addAwards={addAwards}
                        editAwards={editAwards}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AwardsModal
