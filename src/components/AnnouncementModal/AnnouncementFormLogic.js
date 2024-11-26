/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'

const AnnouncementFormLogic = (announcementData, editAnnoId) => {
    const initialFormValue = {
        announcementTitle: '',
        announcementDetails: '',
        selectDepartment: '',
        document: []
    }

    const [formData, setFormData] = useState(initialFormValue)
    const [errors, setErrors] = useState(initialFormValue)
    const [departmentData, setDepartmentData] = useState([])

    const validateField = (name, value) => {
        switch (name) {
            case 'announcementTitle':
                if (value.trim() === '') {
                    return 'Announcement title is required'
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    return 'Announcement title should contain only characters'
                }
                break
            case 'announcementDetails':
                if (value.trim() === '') {
                    return 'Announcement Detail is required'
                }
                break
            case 'selectDepartment':
                if (value === '') {
                    return 'Department is required'
                }
                break
            case 'document':
                if (value.length === 0) {
                    return 'Document is required'
                }
                break
        }

        return ''
    }

    const validateForm = () => {
        const newErrors = {}
        Object.keys(initialFormValue).forEach(name => {
            const value = formData[name]
            const error = validateField(name, value)
            newErrors[name] = error
        })

        setErrors(newErrors)

        return !Object.values(newErrors).some(error => error !== '')
    }

    const handleInputChange = event => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })

        const error = validateField(name, value)

        setErrors({
            ...errors,
            [name]: error
        })
    }

    const handleImageChange = files => {
        setFormData({
            ...formData,
            document: files // Store the selected image
        })
    }

    // Fetch department data
    const fetchDepartment = () => {
        const storedDepartments = localStorage.getItem('department');

        if (storedDepartments) {
            // Parse and filter active departments
            const parsedData = JSON.parse(storedDepartments);
            const activeDepartments = parsedData.filter(data => data.status === 'Active');
            setDepartmentData(activeDepartments);
        } else {
            console.warn('No department data found in localStorage');
        }
    };

    useEffect(() => {
        const selectedAnnouncement = announcementData.find(anno => anno.id === editAnnoId)

        if (selectedAnnouncement) {
            setFormData(selectedAnnouncement)
        } else {
            setFormData({
                ...initialFormValue
            })
        }
    }, [editAnnoId, announcementData])

    return {
        handleInputChange,
        handleImageChange,
        formData,
        errors,
        validateForm,
        setFormData,
        initialFormValue,
        fetchDepartment,
        departmentData
    }
}

export default AnnouncementFormLogic
