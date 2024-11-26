import {
    Button,
    Grid,
    Divider,
    TextField,
    Typography,
    CardActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useTheme
} from '@mui/material'
import LeaveTypeFormLogic from './LeaveTypeFormLogic'
import { useState } from 'react'

const LeaveTypeForm = ({ handleClose, leaveTypeData, editLeaveTypeId, setOpen, addLeaveType, editLeaveType }) => {
    const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = LeaveTypeFormLogic(
        leaveTypeData,
        editLeaveTypeId
    )
    const [loading, setLoading] = useState(false) // Add loading state
    const theme = useTheme()

    const handleFormSubmit = event => {
        event.preventDefault()

        if (!validateForm()) {
            return // If the form is not valid, don't submit
        }

        try {
            if (editLeaveTypeId) {
                editLeaveType(formData, editLeaveTypeId)
            } else {
                addLeaveType(formData)
            }

            setFormData(initialFormValue)
            setOpen(false)
        } catch (error) {
            console.error('Error submitting the form:', error)
        } finally {
            setLoading(false) // Set loading to false once submission is done
        }
    }

    const isInEditMode = !!editLeaveTypeId

    return (
        <>
            <div>
                <form onSubmit={handleFormSubmit} autoComplete='off'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                label='Leave Type Name'
                                id='leaveName'
                                name='leaveName'
                                value={formData.leaveName}
                                onChange={handleInputChange}
                            />
                            {errors.leaveName && (
                                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.leaveName}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Leave Type Balance'
                                id='leaveBalance'
                                name='leaveBalance'
                                value={formData.leaveBalance}
                                onChange={handleInputChange}
                            />
                            {errors.leaveBalance && (
                                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.leaveBalance}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <FormControl fullWidth>
                                <InputLabel id='form-layouts-separator-select-label'>Leave Status</InputLabel>
                                <Select
                                    label='Leave Status'
                                    defaultValue=''
                                    labelId='form-layouts-separator-select-label'
                                    id='leaveStatus'
                                    name='leaveStatus'
                                    value={formData.leaveStatus}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value='Active'>Active</MenuItem>
                                    <MenuItem value='Inactive'>Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider sx={{ margin: 0 }} />
                    <CardActions sx={{ pl: 0, pb: 0 }}>
                        <Button
                            size='large'
                            type='submit'
                            sx={{
                                mr: 2,
                                '&.MuiButton-root:hover': {
                                    backgroundColor: theme.palette.primary.hover
                                }
                            }}
                            variant='contained'
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? <>Saving...</> : !isInEditMode ? 'Save' : 'Update'}
                        </Button>
                        <Button
                            size='large'
                            color='secondary'
                            variant='outlined'
                            onClick={handleClose}
                            disabled={loading} // Disable button while loading
                        >
                            Cancel
                        </Button>
                    </CardActions>
                </form>
            </div>
        </>
    )
}

export default LeaveTypeForm
