import {
    Button,
    CardActions,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    useTheme
} from '@mui/material'
import React, { useState } from 'react'
import DesignationFormLogic from './DesignationFormLogic'

const DesignationForm = ({ handleClose, editDesignationId, designationData, setOpen, addDesignation }) => {
    const { handleInputChange, formData, errors, validateForm, setFormData, initialFormValue } = DesignationFormLogic(
        designationData,
        editDesignationId
    )
    const [loading, setLoading] = useState(false) // Add loading state
    const theme = useTheme()

    const handleFormSubmit = event => {
        event.preventDefault()

        if (!validateForm()) {
            return // If the form is not valid, don't submit
        }

        setLoading(true) // Set loading to true when starting submission

        try {
            addDesignation(formData)

            setFormData(initialFormValue)
            setOpen(false)
        } catch (error) {
            console.error('Error submitting the form:', error)
        } finally {
            setLoading(false) // Set loading to false once submission is done
        }
    }

    // const descriptionElementRef = useRef(null);

    // useEffect(() => {
    //   const { current: descriptionElement } = descriptionElementRef;
    //   if (descriptionElement !== null) {
    //     descriptionElement.focus();
    //   }
    // }, []);

    return (
        <div>
            <form onSubmit={handleFormSubmit} autoComplete='off'>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            label='Designation Name'
                            id='designationName'
                            name='designationName'
                            value={formData.designationName}
                            onChange={handleInputChange}
                        />
                        {errors.designationName && (
                            <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.designationName}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                label='Status'
                                defaultValue='Active'
                                labelId='form-layouts-separator-select-label'
                                id='status'
                                name='status'
                                value={formData.status}
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
                        {loading ? 'Saving...' : 'Save'}
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
    )
}

export default DesignationForm