import {
  Box,
  Card,
  TextField,
} from '@mui/material'
import React from 'react'
import useRoleData from 'src/hooks/useRoleData'
import { Toaster } from 'react-hot-toast'
import RoleModal from 'src/components/RoleModal/RoleModal'
import RoleTable from 'src/views/role/RoleTable'
import { inputField, inputLabel } from 'src/Styles'

const Role = () => {
  const {
    loading,
    roleData,
    editRoleId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    addRole,
    updateRoleStatus,
    searchQuery,
    handleSearchChange
  } = useRoleData()

  return (
    <>
      <Toaster />

      <Card sx={{ p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
        <Box
          sx={{
            width: '100%',
            display: { xs: 'grid', sm: 'flex', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          mb={4}
        >
          <RoleModal
            editRoleId={editRoleId}
            roleData={roleData}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addRole={addRole}
          />
          <TextField
            label='Search Role'
            variant='filled'
            size='small'
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...inputField, ...inputLabel }}
          />
        </Box>

        <RoleTable searchQuery={searchQuery} roleData={roleData} loading={loading} updateRoleStatus={updateRoleStatus} />
      </Card>
    </>
  )
}

export default Role