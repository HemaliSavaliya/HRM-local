/* eslint-disable react-hooks/exhaustive-deps */
import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Autocomplete,
    Box,
    Typography,
    Divider,
    Grid,
    useTheme
} from '@mui/material'
import { useEffect } from 'react'
import { cancelButton, inputField, inputLabel, saveButton } from 'src/Styles'

const AddEventModal = ({
    open,
    handleClose,
    eventFormData,
    setEventFormData,
    onAddEvent,
    todos,
    scroll,
    editedEvent,
    editedEventData
}) => {
    const { description } = eventFormData
    const theme = useTheme()

    useEffect(() => {
        if (editedEvent) {
            // If there is an editedEvent, set the form data accordingly
            setEventFormData({
                id: editedEvent.id,
                description: editedEvent.description,
                todoId: editedEvent.todoId
            })
        }
    }, [editedEvent])

    const onClose = () => handleClose()

    const onChange = event => {
        setEventFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleTodoChange = (e, value) => {
        setEventFormData(prevState => ({
            ...prevState,
            todoId: value?.id
        }))
    }

    return (
        <Dialog
            open={open}
            scroll={scroll}
            onClose={onClose}
            aria-labelledby='scroll-dialog-title'
            aria-describedby='scroll-dialog-description'
        >
            <DialogTitle id='scroll-dialog-title'>
                <Typography variant='h6' fontWeight={600}>
                    {editedEventData ? 'Update Event' : 'Add Event'}
                </Typography>
                <Typography variant='caption' fontWeight={600}>
                    To {editedEventData ? 'update' : 'add'} an event, please fill in the information below.
                </Typography>
            </DialogTitle>

            <Divider sx={{ margin: 0 }} />

            <DialogContent>
                <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
                    <Box component='form' autoComplete='off'>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="filled"
                                    size='small'
                                    name='description'
                                    value={description}
                                    margin='dense'
                                    id='description'
                                    label='Description'
                                    type='text'
                                    fullWidth
                                    onChange={onChange}
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Autocomplete
                                    onChange={handleTodoChange}
                                    disablePortal
                                    id='combo-box-demo'
                                    options={todos}
                                    getOptionLabel={option => option.name}
                                    renderInput={params => <TextField {...params} label='Todo' variant="filled" size='small' sx={{ ...inputField, ...inputLabel }} />}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContentText>
            </DialogContent>
            <Divider sx={{ margin: 0 }} />
            <DialogActions>
                <Button color='secondary' variant='outlined' onClick={onClose} sx={cancelButton}>
                    Cancel
                </Button>
                <Button
                    sx={{
                        ...saveButton,
                        '&.MuiButton-root:hover': {
                            backgroundColor: theme.palette.primary.hover
                        }
                    }}
                    type='submit'
                    variant='contained'
                    disabled={description === ''}
                    onClick={onAddEvent}
                >
                    {editedEventData ? 'Update' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddEventModal
