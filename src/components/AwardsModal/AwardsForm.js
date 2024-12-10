/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState } from 'react'
import AwardsFormLogic from './AwardsFormLogic'

const AwardsForm = ({ handleClose, editAwardId, awardsData, setOpen, addAwards, editAwards }) => {
    const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = AwardsFormLogic(
        awardsData,
        editAwardId
    )

    const [awardsUser, setAwardsUser] = useState([])
    const [loading, setLoading] = useState(false) // Add loading state
    const theme = useTheme()

    const fetchUserList = async () => {
        const storedUser = localStorage.getItem('employee');

        if (storedUser) {
            // Parse and filter active employee
            const parsedData = JSON.parse(storedUser);
            const activeEmployees = parsedData.filter(
                (data) => data.status === 'Active' && data.role === 'employee'
            );
            setAwardsUser(activeEmployees);
        } else {
            console.warn('No employee data found in localStorage');
        }
    }

    useEffect(() => {
        fetchUserList()
    }, [])

    const handleFormSubmit = event => {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        setLoading(true) // Set loading to true when starting submission

        // Find the selected user based on employeeName
        const selectedUser = awardsUser.find(user => user.name === formData.employeeName)

        try {
            if (selectedUser) {
                // Include userId in the formData before making the API request
                const formDataWithUserId = {
                    ...formData,
                    employeeId: selectedUser.id || ''
                }

                if (editAwardId) {
                    editAwards(formDataWithUserId, editAwardId)
                } else {
                    addAwards(formDataWithUserId)
                }

                setFormData(initialFormValue)
                setOpen(false)
            }
        } catch (error) {
            console.error('Error submitting the form:', error)
        } finally {
            setLoading(false) // Set loading to false once submission is done
        }
    }

    const isInEditMode = !!editAwardId

    return (
        <>
            <div>
                <form onSubmit={handleFormSubmit} autoComplete='off'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                label='Awards Name'
                                id='awardsName'
                                name='awardsName'
                                value={formData.awardsName}
                                onChange={handleInputChange}
                            />
                            {errors.awardsName && (
                                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.awardsName}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                label='Awards Details'
                                id='awardsDetails'
                                name='awardsDetails'
                                multiline
                                rows={3}
                                value={formData.awardsDetails}
                                onChange={handleInputChange}
                            />
                            {errors.awardsDetails && (
                                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.awardsDetails}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel id='form-layouts-separator-select-label'>Employee</InputLabel>
                                <Select
                                    label='Employee'
                                    defaultValue=''
                                    labelId='form-layouts-separator-select-label'
                                    id='employeeName'
                                    name='employeeName'
                                    value={formData.employeeName}
                                    onChange={handleInputChange}
                                >
                                    {awardsUser.length === 0 ? (
                                        <MenuItem disabled>No Employee</MenuItem>
                                    ) : (
                                        awardsUser.map(user => (
                                            <MenuItem key={user.id} value={user.name}>
                                                {user.name} - {user.id}
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                            {errors.employeeName && (
                                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.employeeName}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
                            <TextField
                                fullWidth
                                label='Reward'
                                id='reward'
                                name='reward'
                                value={formData.reward}
                                onChange={handleInputChange}
                            />
                            {errors.reward && (
                                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.reward}</Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Divider sx={{ margin: 0 }} />
                    <CardActions sx={{ pl: 0, pb: 0 }}>
                        <Button
                            size='large'
                            type='submit'
                            sx={{
                                mr: 2,
                                lineHeight: 0,
                                padding: '20px 25px !important',
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
                            sx={{ lineHeight: 0, padding: '20px 25px !important' }}
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

export default AwardsForm
