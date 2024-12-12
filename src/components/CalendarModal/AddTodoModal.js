/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from '@mui/material'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import { HexColorPicker } from 'react-colorful'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const AddTodoModal = ({ open, handleClose, todos, setTodos }) => {
    const [color, setColor] = useState('#b32aa9')
    const [name, setName] = useState('')
    const [editingTodo, setEditingTodo] = useState(null)
    const theme = useTheme()

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
        setTodos(savedTodos)
    }, [])

    const onAddTodo = async () => {
        try {
            const newTodo = { id: editingTodo ? editingTodo.id : Date.now(), name, color }

            if (editingTodo) {
                // Update existing todo
                const updatedTodos = todos.map(todo => todo.id === editingTodo.id ? newTodo : todo)
                setTodos(updatedTodos)
                localStorage.setItem('todos', JSON.stringify(updatedTodos))
                setEditingTodo(null)
            } else {
                // Add new todo
                const updatedTodos = [...todos, newTodo]
                setTodos(updatedTodos)
                localStorage.setItem('todos', JSON.stringify(updatedTodos))
            }

            // Reset the form fields
            setName('')
            setColor('#b32aa9')

            toast.success(editingTodo ? 'Todo Updated Successfully!' : 'Todo Added Successfully!')
        } catch (error) {
            console.error('Error adding/updating todos:', error)
            toast.error('Error Adding/Updating Todo. Please try again.')
        }
    }

    const onEditTodo = _id => {
        const todoToEdit = todos.find(todo => todo.id === _id)
        if (todoToEdit) {
            setEditingTodo(todoToEdit)
            setName(todoToEdit.name)
            setColor(todoToEdit.color)
        }
    }

    const onDeleteTodo = async _id => {
        const updatedTodos = todos.filter(todo => todo.id !== _id)
        setTodos(updatedTodos)
        localStorage.setItem('todos', JSON.stringify(updatedTodos))

        toast.success('Todo Deleted Successful!', {
            duration: 2000,
            position: 'top-center',

            // Styling
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })
    }

    const onClose = () => {
        setEditingTodo('')
        setName('')
        setColor('')
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby='scroll-dialog-title'
            aria-describedby='scroll-dialog-description'
        >
            <DialogTitle id='scroll-dialog-title'>
                <Typography variant='h6' fontWeight={600}>
                    Add Todos
                </Typography>
                <Typography variant='caption' fontWeight={600}>
                    Create todos to add to your Calendar.
                </Typography>
            </DialogTitle>
            <Divider sx={{ margin: 0 }} />
            <DialogContent>
                <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
                    <TextField
                        autoComplete='off'
                        name='name'
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Name'
                        type='text'
                        fullWidth
                        sx={{ mb: 6 }}
                        required
                        variant='outlined'
                        onChange={e => {
                            setName(e.target.value)
                        }}
                        value={name}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <HexColorPicker color={color} onChange={setColor} style={{ width: 270, height: 200 }} />
                        <Box
                            sx={{ height: 50, width: 50, borderRadius: 0.9, ml: 3, backgroundColor: color }}
                            className='value'
                        ></Box>
                    </Box>
                    <Box>
                        <List sx={{ marginTop: 3 }}>
                            {todos.map(todo => (
                                <ListItem
                                    key={todo.id}
                                    secondaryAction={
                                        <>
                                            <IconButton onClick={() => onEditTodo(todo.id)} edge='end' color='default'>
                                                <PencilOutline />
                                            </IconButton>
                                            <IconButton onClick={() => onDeleteTodo(todo.id)} color='error' edge='end'>
                                                <DeleteOutline />
                                            </IconButton>
                                        </>
                                    }
                                >
                                    <Box
                                        sx={{ height: 20, width: 20, borderRadius: 0.4, marginRight: 2 }}
                                        className='value'
                                        style={{ backgroundColor: todo.color }}
                                    ></Box>
                                    <ListItemText primary={todo.name} sx={{ textTransform: 'capitalize' }} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </DialogContentText>
            </DialogContent>
            <Divider sx={{ margin: 0 }} />
            <DialogActions>
                <Button size='large' color='secondary' variant='outlined' onClick={onClose}>
                    Cancel
                </Button>
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
                    disabled={name === '' || color === ''}
                    onClick={() => onAddTodo()}
                >
                    {editingTodo ? 'Update' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddTodoModal
