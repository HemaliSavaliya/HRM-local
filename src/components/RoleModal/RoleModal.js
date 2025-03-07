import { Button, Dialog, DialogContent, DialogTitle, Typography, useTheme } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'
import RoleForm from './RoleForm'
import { saveButton } from 'src/Styles'
import { PlusSignIcon } from 'hugeicons-react'

const RoleModal = ({ editRoleId, roleData, open, setOpen, scroll, handleClickOpen, handleClose, addRole }) => {
    const theme = useTheme()

    return (
        <>
            <Button
            
                // component={motion.div}
                // whileHover={{
                //     scale: 0.9,
                //     transition: { duration: 0.4 }
                // }}
                // initial={{ opacity: 0, y: 15 }}
                // animate={{ opacity: 1, y: 0 }}
                // exist={{ opacity: 0, y: 15 }}
                // transition={{ delay: 0.25 }}
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
                Add Role <PlusSignIcon size={15} />
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogTitle id='scroll-dialog-title'>
                    <Typography fontWeight={600}>{editRoleId ? 'Edit Role' : 'Add Role'}</Typography>
                </DialogTitle>
                <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
                    <RoleForm
                        handleClose={handleClose}
                        editRoleId={editRoleId}
                        roleData={roleData}
                        setOpen={setOpen}
                        addRole={addRole}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default RoleModal