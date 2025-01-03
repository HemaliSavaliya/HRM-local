/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

const AwardsFormLogic = (awardsData, editAwardId) => {
    const initialFormValue = {
        awardsName: '',
        awardsDetails: '',
        employeeName: '',
        reward: ''
    }

    const [formData, setFormData] = useState(initialFormValue)
    const [errors, setErrors] = useState(initialFormValue)

    const validateField = (name, value) => {
        switch (name) {
            case 'awardsName':
                if (value.trim() === '') {
                    return 'Awards name is required'
                }
                break
            case 'awardsDetails':
                if (value.trim() === '') {
                    return 'Awards details is required'
                }
                break
            case 'employeeName':
                if (value === '') {
                    return 'Employee is required'
                }
                break
            case 'reward':
                if (value.trim() === '') {
                    return 'Reward is required'
                }
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

    useEffect(() => {
        const selectedAwards = awardsData.find(award => award.id === editAwardId)

        if (selectedAwards) {
            setFormData(selectedAwards)
        } else {
            setFormData({
                ...initialFormValue
            })
        }
    }, [awardsData, editAwardId])

    return {
        handleInputChange,
        formData,
        errors,
        validateForm,
        setFormData,
        initialFormValue
    }
}

export default AwardsFormLogic
