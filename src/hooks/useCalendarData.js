/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const initialEventFormState = {
    description: '',
    todoId: undefined
}

const initialDatePickerEventFormData = {
    description: '',
    todoId: undefined,
    allDay: false,
    start: undefined,
    end: undefined
}

const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString()

const useCalendarData = () => {
    const [openSlot, setOpenSlot] = useState(false)
    const [openDatepickerModal, setOpenDatepickerModal] = useState(false)
    const [openTodoModal, setOpenTodoModal] = useState(false)
    const [currentEvent, setCurrentEvent] = useState(null)
    const [eventInfoModal, setEventInfoModal] = useState(false)
    const [events, setEvents] = useState([])
    const [editedEventData, setEditedEventData] = useState(null)
    const [todos, setTodos] = useState([])
    const [eventFormData, setEventFormData] = useState(initialEventFormState)
    const [datePickerEventFormData, setDatePickerEventFormData] = useState(initialDatePickerEventFormData)
    const [scroll, setScroll] = useState('body')
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const currentDate = new Date()
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

    // ** Hooks
    const theme = useTheme()

    // Fetch events from the backend when the component is mounted
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || []
        setEvents(storedEvents)
    }, [])

    // Save events to localStorage whenever they update
    useEffect(() => {
        localStorage.setItem('calendarEvents', JSON.stringify(events))
    }, [events])

    const handleSelectSlot = (event, scrollType) => {
        setOpenSlot(true)
        setScroll(scrollType)
        setCurrentEvent(event)
    }

    const handleSelectEvent = event => {
        setCurrentEvent(event)
        setEventInfoModal(true)
    }

    const handleClose = () => {
        setEventFormData(initialEventFormState)
        setOpenSlot(false)
        setEditedEventData(null)
    }

    const handleDatePickerClose = () => {
        setDatePickerEventFormData(initialDatePickerEventFormData)
        setOpenDatepickerModal(false)
    }

    const onAddEvent = e => {
        e.preventDefault()

        if (editedEventData) {
            // Update existing event
            const updatedEvents = events.map(event =>
                event.id === editedEventData.id
                    ? { ...event, ...eventFormData, start: currentEvent?.start, end: currentEvent?.end }
                    : event
            )

            setEvents(updatedEvents)
            setEditedEventData(null) // Clear edited event data
            toast.success('Calendar Event Updated Successfully!', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: '15px'
                }
            })
        } else {
            // Add a new event
            const newEvent = {
                ...eventFormData,
                id: generateId(),
                start: currentEvent?.start,
                end: currentEvent?.end
            }

            setEvents([...events, newEvent])
            toast.success('Calendar Event Added Successfully!', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: '15px'
                }
            })
        }

        setEventFormData(initialEventFormState) // Clear form data
        handleClose()
    }

    const onAddEventFromDatePicker = async e => {
        e.preventDefault()

        const addHours = (date, hours) => {
            return date ? date.setHours(date.getHours() + hours) : undefined
        }

        const setMinToZero = date => {
            date.setSeconds(0)

            return date
        }

        const newEvent = {
            ...datePickerEventFormData,
            id: generateId(),
            start: setMinToZero(datePickerEventFormData.start),
            end: datePickerEventFormData.allDay
                ? addHours(datePickerEventFormData.start, 12)
                : setMinToZero(datePickerEventFormData.end)
        }

        setEvents([...events, newEvent])

        toast.success('Calendar Event Added Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })

        handleDatePickerClose()
    }

    const onDeleteEvent = async () => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== currentEvent.id))
        setEventInfoModal(false)

        toast.success('Calendar Event Deleted Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })
    }

    const onEditEvent = _id => {
        setOpenSlot(true)
        const eventToEdit = events.find(event => event.id === _id)
        if (eventToEdit) {
            setEditedEventData(eventToEdit)
            setEventFormData({
                description: eventToEdit.description,
                todoId: eventToEdit.todoId,
                start: currentEvent?.start,
                end: currentEvent?.end
            })
        }
    }

    const dayPropGetter = date => {
        const isPrevMonth = date.getMonth() < currentMonth
        const isNextMonth = date.getMonth() > currentMonth
        const isCurrentDate = date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth()

        return {
            style: {
                backgroundColor:
                    isPrevMonth || isNextMonth
                        ? theme.palette.background.default
                        : isCurrentDate
                            ? theme.palette.background.default
                            : '' // Set the desired background color
            }
        }
    }

    const handleNavigate = (date, view) => {
        // Update the currentMonth state when the user navigates to a different month
        setCurrentMonth(date.getMonth())
    }

    return {
        openSlot,
        openDatepickerModal,
        openTodoModal,
        setOpenTodoModal,
        eventInfoModal,
        todos,
        setTodos,
        scroll,
        handleSelectSlot,
        handleSelectEvent,
        onAddEvent,
        onAddEventFromDatePicker,
        onDeleteEvent,
        onEditEvent,
        dayPropGetter,
        handleNavigate,
        handleClose,
        eventFormData,
        setEventFormData,
        currentEvent,
        editedEventData,
        handleDatePickerClose,
        datePickerEventFormData,
        setDatePickerEventFormData,
        events,
        generateId,
        setOpenDatepickerModal,
        setEventInfoModal
    }
}

export default useCalendarData
