/* eslint-disable react-hooks/exhaustive-deps */
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Button,
    Dialog,
    DialogContent,
    Slide,
    DialogTitle,
    Typography
} from '@mui/material'
import axios from 'axios'
import { forwardRef, useEffect, useState } from 'react'
import { inputField, inputLabel } from 'src/Styles'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const ConfirmationModal = ({
    showConfirm,
    setShowConfirm,
    onSaveProject,
    onCancelConfirm,
    projectName,
    setProjectName,
    description,
    handleChange,
    setDescription,
    isTimerRunning
}) => {
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
    const [projectData, setProjectData] = useState([])

    const fetchProjects = async () => {
        const storedProject = localStorage.getItem('project');

        if (storedProject) {
            // Parse and filter active project
            const parsedProjects = JSON.parse(storedProject);
            const userId = authToken?.id;

            // If userId is blank, show all projects, otherwise filter by userId
            const filteredProjects = userId
                ? parsedProjects.filter(
                    (project) =>
                        project.status === 'Inprogress' && project.userId.includes(userId)
                )
                : parsedProjects; // Display all projects if userId is blank

            setProjectData(filteredProjects);
        } else {
            console.warn('No project data found in localStorage');
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <Dialog
            TransitionComponent={Transition}
            keepMounted
            open={showConfirm}
            onClose={() => setShowConfirm(false)}
            aria-describedby='alert-dialog-slide-description'
        >
            <DialogContent>
                {!isTimerRunning && (
                    <>
                        <DialogTitle id='scroll-dialog-title' sx={{ padding: '0 !important', mb: 5 }}>
                            <Typography fontWeight={600}>Project Details</Typography>
                        </DialogTitle>
                        {authToken?.role === 'hr' ? null : (
                            <FormControl fullWidth variant="filled" size='small'>
                                <InputLabel sx={inputLabel}>Project Name</InputLabel>
                                <Select
                                    sx={{ ...inputField, mb: 5 }}
                                    label='Project Name'
                                    labelId='form-layouts-separator-select-label'
                                    id='name'
                                    name='name'
                                    value={projectName}
                                    onChange={e => setProjectName(e.target.value)}
                                >
                                    {projectData.length === 0 ? (
                                        <MenuItem disabled>No Project</MenuItem>
                                    ) : (
                                        projectData.map(project => (
                                            <MenuItem key={project.id} value={project.projectName}>
                                                {project.projectName}
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                        )}

                        <TextField
                            fullWidth
                            variant="filled"
                            size='small'
                            multiline
                            rows={4}
                            label='Description'
                            id='description'
                            name='description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            onKeyPress={handleChange}
                            sx={{ ...inputField, ...inputLabel }}
                        />
                    </>
                )}

                {isTimerRunning && (
                    <>
                        <p>Are you sure you want to stop the timer and save the data?</p>
                        <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={onSaveProject}>
                            Save
                        </Button>
                        <Button size='large' color='secondary' variant='outlined' onClick={onCancelConfirm}>
                            Cancel
                        </Button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmationModal
