
import React from 'react'
import {
    Card,
    Box,
    TextField
} from '@mui/material'
import { Toaster } from 'react-hot-toast'
import ConfirmationModal from 'src/common/ConfirmationModal'
import useHolidayData from 'src/hooks/useHolidayData'
import HolidayModal from 'src/components/Holidays/HolidayModal'
import HolidayTable from 'src/views/holiday/HolidayTable'

const Holiday = () => {
    const {
        loading,
        holidayData,
        editHolidayId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        addHoliday,
        editHoliday,
        deleteModalOpen,
        setDeleteModalOpen,
        confirmDeleteHoliday,
        handleDeleteHoliday,
        searchQuery,
        handleSearchChange
    } = useHolidayData()

    return (
        <>
            <Toaster />

            <ConfirmationModal
                open={deleteModalOpen}
                onConfirm={confirmDeleteHoliday}
                onClose={() => setDeleteModalOpen(false)}
                title='Delete Holiday'
                content='Are you sure you want to delete this holiday?'
            />

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
                    <HolidayModal
                        editHolidayId={editHolidayId}
                        holidayData={holidayData}
                        open={open}
                        setOpen={setOpen}
                        scroll={scroll}
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}
                        addHoliday={addHoliday}
                        editHoliday={editHoliday}
                    />
                    <TextField
                        sx={{ mt: { xs: 3, sm: 0, lg: 0 } }}
                        label='Search Holiday'
                        variant='outlined'
                        size='small'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Box>

                <HolidayTable
                    searchQuery={searchQuery}
                    holidayData={holidayData}
                    loading={loading}
                    handleEdit={handleEdit}
                    handleDeleteHoliday={handleDeleteHoliday}
                />
            </Card>
        </>
    )
}

export default Holiday
