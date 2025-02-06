import React from 'react'
import {
    Card,
    Box,
    TextField,
} from '@mui/material'
import useDepartmentData from 'src/hooks/useDepartmentData'
import DepartmentModal from 'src/components/DepartmentModal/DepartmentModal'
import DepartmentTable from './DepartmentTable'
import { Toaster } from 'react-hot-toast'
import { inputField, inputLabel } from 'src/Styles'

const Department = () => {
    const {
        departmentData,
        editDepartId,
        open,
        setOpen,
        scroll,
        handleEdit,
        handleClickOpen,
        handleClose,
        addDepartments,
        editDepartments,
        updateDepartmentStatus,
        loading,
        searchQuery,
        handleSearchChange
    } = useDepartmentData()

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
                    <DepartmentModal
                        editDepartId={editDepartId}
                        departmentData={departmentData}
                        open={open}
                        setOpen={setOpen}
                        scroll={scroll}
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}
                        addDepartments={addDepartments}
                        editDepartments={editDepartments}
                    />
                    <TextField
                        sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...inputField, ...inputLabel }}
                        label='Search Department'
                        variant='filled'
                        size='small'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Box>

                <DepartmentTable searchQuery={searchQuery} departmentData={departmentData} loading={loading} updateDepartmentStatus={updateDepartmentStatus} handleEdit={handleEdit} />
            </Card>
        </>
    )
}

export default Department