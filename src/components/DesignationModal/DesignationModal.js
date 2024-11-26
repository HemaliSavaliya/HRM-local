import { Dialog, DialogContent, DialogTitle, Typography, Button, Box, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import DesignationForm from './DesignationForm'

const DesignationModal = ({
    editDesignationId,
    designationData,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    addDesignation
}) => {
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
                Add Designation
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogTitle id='scroll-dialog-title'>
                    <Typography fontWeight={600}>{editDesignationId ? 'Edit Designation' : 'Add Designation'}</Typography>
                </DialogTitle>
                <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
                    <DesignationForm
                        handleClose={handleClose}
                        editDesignationId={editDesignationId}
                        designationData={designationData}
                        setOpen={setOpen}
                        addDesignation={addDesignation}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DesignationModal