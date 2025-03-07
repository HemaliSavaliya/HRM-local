import {
    Button,
    Grid,
    Divider,
    MenuItem,
    TextField,
    InputLabel,
    Typography,
    CardActions,
    FormControl,
    Select,
    Autocomplete,
    Chip,
    useTheme
} from '@mui/material'
import { DropFiles } from 'src/@core/DropFile/DropFiles'
import { useEffect, useState } from 'react'
import ProjectFormLogic from './ProjectFormLogic'
import { cancelButton, inputField, inputLabel, saveButton } from 'src/Styles'

const ProjectForm = ({ handleClose, editProjectId, setOpen, projectData, addProjects, editProjects }) => {
    const {
        formData,
        handleInputChange,
        handleImageChange,
        errors,
        validateForm,
        setFormData,
        initialFormValue,
        handleTeamMembersChange
    } = ProjectFormLogic(projectData, editProjectId)

    const [teamMemberData, setTeamMemberData] = useState([])
    const [teamMemberId, setTeamMemberId] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
    const theme = useTheme()

    useEffect(() => {
        const fetchEmpList = () => {
            try {
                // Retrieve employee data from localStorage
                const storedEmpData = localStorage.getItem('employee')
                const empList = storedEmpData ? JSON.parse(storedEmpData) : []

                // Filter out employees with the role of 'HR'
                const filteredTeamMemberData = empList.filter(item => item.role !== 'hr')

                // Map the filtered data to get names and IDs
                const fetchedTeamMemberData = filteredTeamMemberData.map(item => item.name)
                const fetchedTeamMemberId = filteredTeamMemberData.map(item => item.id)

                // Set the state with the fetched data
                setTeamMemberData(fetchedTeamMemberData)
                setTeamMemberId(fetchedTeamMemberId)
            } catch (error) {
                console.error('Error fetching employee data from localStorage', error)
            }
        }

        fetchEmpList()
    }, [authToken?.token])

    const handleFormSubmit = async event => {
        event.preventDefault()

        if (!validateForm()) {
            return // If the form is not valid, don't submit
        }

        // Convert the team members from an array of objects to an array of strings
        const teamMembersArray = formData.teamMembers.map(member => member.name)
        const teamMembersIdArray = formData.userId.map(member => member.id)

        // Update the formData object to include the team members array
        const updatedFormData = {
            ...formData,
            teamMembers: teamMembersArray,
            userId: teamMembersIdArray
        }

        if (editProjectId) {
            // Disable the save button to prevent multiple submissions
            setIsSaving(true)
            try {
                await editProjects(updatedFormData, editProjectId)
            } catch (error) {
                console.error('Error')
            } finally {
                // Ensure to re-enable the save button even if an error occurs
                setIsSaving(false)
                setOpen(false)
            }
        } else {
            // Disable the save button to prevent multiple submissions
            setIsSaving(true)
            try {
                await addProjects(updatedFormData)
                setFormData(initialFormValue)
            } catch (error) {
                console.error('Error')
            } finally {
                // Ensure to re-enable the save button even if an error occurs
                setIsSaving(false)
            }
        }
    }

    const isInEditMode = !!editProjectId

    return (
        <>
            <div>
                <form onSubmit={handleFormSubmit} autoComplete='off'>
                    <Grid container spacing={5}>
                        {!isInEditMode && (
                            <>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        size='small'
                                        label='Project Name'
                                        id='projectName'
                                        name='projectName'
                                        value={formData.projectName}
                                        onChange={handleInputChange}
                                        sx={{ ...inputField, ...inputLabel }}
                                    />
                                    {errors.projectName && (
                                        <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.projectName}</Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        size='small'
                                        label='Client Name'
                                        id='clientName'
                                        name='clientName'
                                        value={formData.clientName}
                                        onChange={handleInputChange}
                                        sx={{ ...inputField, ...inputLabel }}
                                    />
                                    {errors.clientName && (
                                        <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.clientName}</Typography>
                                    )}
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="filled"
                                size='small'
                                type='email'
                                label='Client Email'
                                id='clientEmail'
                                name='clientEmail'
                                value={formData.clientEmail}
                                onChange={handleInputChange}
                                sx={{ ...inputField, ...inputLabel }}
                            />
                        </Grid>
                        {!isInEditMode && (
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    type='date'
                                    label='Start Date'
                                    id='startDate'
                                    name='startDate'
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    inputProps={{
                                        placeholder: '' // Set an empty string as the placeholder
                                    }}
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                                {errors.startDate && (
                                    <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.startDate}</Typography>
                                )}
                            </Grid>
                        )}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="filled"
                                size='small'
                                type='date'
                                label='End Date'
                                id='endDate'
                                name='endDate'
                                value={formData.endDate}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputProps={{
                                    placeholder: '' // Set an empty string as the placeholder
                                }}
                                sx={{ ...inputField, ...inputLabel }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="filled" size='small'>
                                <InputLabel id='form-layouts-separator-select-label' sx={inputLabel}>Status</InputLabel>
                                <Select
                                    label='Status'
                                    defaultValue='Upcoming'
                                    labelId='form-layouts-separator-select-label'
                                    id='status'
                                    name='status'
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    sx={inputField}
                                >
                                    <MenuItem value='Upcoming'>Upcoming</MenuItem>
                                    <MenuItem value='Inprogress'>Inprogress</MenuItem>
                                    <MenuItem value='Completed'>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                size='small'
                                multiple
                                options={teamMemberData.map((member, index) => ({
                                    name: member,
                                    id: teamMemberId[index]
                                }))}
                                getOptionLabel={option => option.name}
                                value={formData.teamMembers}
                                onChange={handleTeamMembersChange}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => {
                                        const { key, ...rest } = getTagProps({ index })

                                        return <Chip key={key} variant='outlined' label={`${option.name} (${option.id})`} {...rest} />
                                    })
                                }
                                renderInput={params => (
                                    <TextField variant="filled" size='small' sx={{ ...inputField, ...inputLabel }} {...params} label='Team Members' id='teamMembers' name='teamMembers' />
                                )}
                            />
                            {errors.teamMembers && (
                                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.teamMembers}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div
                                id='document'
                                name='document'
                                style={{
                                    marginBottom: '10px',
                                    padding: '20px',
                                    border: 'dashed',
                                    borderColor: 'currentColor',
                                    borderWidth: 'thin',
                                    borderRadius: '6px',
                                    textAlign: 'center'
                                }}
                            >
                                <DropFiles handleImageChange={handleImageChange} />
                            </div>
                            {errors.document && (
                                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.document}</Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Divider sx={{ margin: 0 }} />
                    <CardActions sx={{ pl: 0, pb: 0 }}>
                        <Button
                            size='large'
                            type='submit'
                            sx={{
                                ...saveButton,
                                '&.MuiButton-root:hover': {
                                    backgroundColor: theme.palette.primary.hover
                                }
                            }}
                            variant='contained'
                            disabled={isSaving} // Disable button while uploading or saving
                        >
                            {isSaving ? 'Saving...' : isInEditMode ? 'Update' : 'Save'}
                        </Button>
                        <Button
                            size='large'
                            color='secondary'
                            variant='outlined'
                            onClick={handleClose}
                            sx={cancelButton}
                        >
                            Cancel
                        </Button>
                    </CardActions>
                </form>
            </div>
        </>
    )
}

export default ProjectForm
