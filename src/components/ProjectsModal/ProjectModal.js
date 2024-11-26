import { Dialog, DialogContent, DialogTitle, Typography, Button, Box, useTheme } from '@mui/material'
import ProjectForm from './ProjectForm'
import { motion } from 'framer-motion'

const ProjectModal = ({
    editProjectId,
    projectData,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    addProjects,
    editProjects
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
                    Add Projects
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
                    <Typography fontWeight={600}>{editProjectId ? 'Edit Projects' : 'Add Projects'}</Typography>
                </DialogTitle>
                <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
                    <ProjectForm
                        handleClose={handleClose}
                        editProjectId={editProjectId}
                        projectData={projectData}
                        setOpen={setOpen}
                        addProjects={addProjects}
                        editProjects={editProjects}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProjectModal
