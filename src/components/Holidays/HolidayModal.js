
import { Dialog, DialogContent, DialogTitle, Typography, Button, Box, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import HolidayForm from './HolidayForm'
import { saveButton } from 'src/Styles'

const HolidayModal = ({
    editHolidayId,
    holidayData,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    addHoliday,
    editHoliday
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
                    ...saveButton,
                    '&.MuiButton-root:hover': {
                        backgroundColor: theme.palette.primary.hover
                    }
                }}
            >
                Add Holiday
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogTitle id='scroll-dialog-title'>
                    <Typography fontWeight={600}>{editHolidayId ? 'Edit Holiday' : 'Add Holiday'}</Typography>
                </DialogTitle>
                <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
                    <HolidayForm
                        handleClose={handleClose}
                        editHolidayId={editHolidayId}
                        holidayData={holidayData}
                        setOpen={setOpen}
                        addHoliday={addHoliday}
                        editHoliday={editHoliday}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default HolidayModal
