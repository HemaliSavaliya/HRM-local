/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

const EmployeeModalLogic = (employeeData, editEmployeeId) => {
    const initialFormValue = {
        name: '',
        password: '',
        email: '',
        mobileNo: '',
        alternateNumber: '',
        address: '',
        designation: '',
        department: '',
        joiningDate: '',
        birthDate: '',
        gender: '',
        bloodGroup: '',
        role: '',
        status: '',
        salary: '',
        bankAccountHolderName: '',
        bankAccountNumber: '',
        bankName: '',
        bankIFSCCode: '',
        bankBranchLocation: '',
        showPassword: false,
        governmentDocument: [] // To store the selected image
    }

    const [formData, setFormData] = useState(initialFormValue)
    const [errors, setErrors] = useState(initialFormValue)
    const [departmentData, setDepartmentData] = useState([])
    const [designationData, setDesignationData] = useState([])
    const [roleData, setRoleData] = useState([])

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (value.trim() === '') {
                    return 'Name is required'
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    return 'Name should contain only characters'
                }
                break
            case 'password':
                if (!editEmployeeId) {
                    if (value === '') {
                        return 'Password is required'
                    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)) {
                        return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                    }
                }
                break
            case 'email':
                if (value.trim() === '') {
                    return 'Email address is required'
                } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(value)) {
                    return 'Invalid email address'
                }
                break
            case 'mobileNo':
                if (value === '') {
                    return 'Mobile number is required'
                } else if (!/^\d{10}$/.test(value)) {
                    return 'Mobile Number must be a 10-digit number'
                }
                break
            case 'designation':
                if (value.trim() === '') {
                    return 'Designation is required'
                }
                break
            case 'department':
                if (value === '') {
                    return 'Department is required'
                }
                break
            case 'joiningDate':
                if (value.trim() === '') {
                    return 'Joining date is required'
                }
                break
            case 'birthDate':
                if (value.trim() === '') {
                    return 'Birth date is required'
                }
                break
            case 'gender':
                if (value === '' || value === 'select gender') {
                    return 'Gender is required'
                }
                break
            case 'role':
                if (value.trim() === '') {
                    return 'Role is required'
                }
                break
            case 'status':
                if (value.trim() === '') {
                    return 'Status is required'
                }
                break
            case 'salary':
                if (value === '') {
                    return 'Salary is required'
                } else if (!/^[0-9]+$/.test(value)) {
                    return 'Salary should contain only number'
                }
                break
            case 'bankAccountHolderName':
                if (value.trim() === '') {
                    return 'Bank account holder name is required'
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    return 'Bank account holder name should contain only characters'
                }
                break
            case 'bankAccountNumber':
                if (value === '') {
                    return 'Account number is required'
                } else if (!/^\d{12}$/.test(value)) {
                    return 'Account number should contain only 12-digit number'
                }
                break
            case 'bankName':
                if (value.trim() === '') {
                    return 'Bank name is required'
                }
                break
            case 'bankIFSCCode':
                if (value === '') {
                    return 'IFSC code is required'
                } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
                    return 'Invalid IFSC code' // ICIC0004702
                }
                break
            case 'bankBranchLocation':
                if (value.trim() === '') {
                    return 'Bank branch location is required'
                }
                break
            case 'governmentDocument':
                if (value.length === 0) {
                    return 'Government Document is required'
                }
                break
        }

        return '' // If no error
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
        if (name === 'department') {
            const selectedDepartment = departmentData.find(d => d.departmentName === value)
            setFormData({ ...formData, department: selectedDepartment?.id || '' })
        }
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

    const handleImageChange = async (files) => {
        const base64Files = await Promise.all(Array.from(files).map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    // Create an object with the file name and Base64 data
                    resolve({
                        name: file.name, // Store the file name
                        data: reader.result // Store the Base64 encoded data
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }));

        setFormData({
            ...formData,
            governmentDocument: base64Files // Store the array of objects
        });
    };


    useEffect(() => {
        const selectedEmployee = employeeData.find(employee => employee.id === editEmployeeId)

        if (selectedEmployee) {
            setFormData(selectedEmployee)
        } else {
            setFormData({
                ...initialFormValue
            })
        }
    }, [editEmployeeId, employeeData])

    // Fetch department data
    const fetchDepartment = async () => {
        const storedDepartments = localStorage.getItem('department');

        if (storedDepartments) {
            // Parse and filter active departments
            const parsedData = JSON.parse(storedDepartments);
            const activeDepartments = parsedData.filter(data => data.status === 'Active');
            setDepartmentData(activeDepartments);
        } else {
            console.warn('No department data found in localStorage');
        }
    }

    // Fetch designation data
    const fetchDesignation = async () => {
        const storedDesignation = localStorage.getItem('designation');

        if (storedDesignation) {
            // Parse and filter active designations
            const parsedData = JSON.parse(storedDesignation);
            const activeDesignation = parsedData.filter(data => data.status === 'Active');
            setDesignationData(activeDesignation);
        } else {
            console.warn('No designation data found in localStorage');
        }
    }

    // Fetch role data
    const fetchRole = async () => {
        const storedRole = localStorage.getItem('roles');

        if (storedRole) {
            // Parse and filter active roles
            const parsedData = JSON.parse(storedRole);
            const activeRole = parsedData.filter(data => data.status === 'Enable');
            setRoleData(activeRole);
        } else {
            console.warn('No role data found in localStorage');
        }
    }

    return {
        handleImageChange,
        handleInputChange,
        formData,
        errors,
        validateForm,
        setFormData,
        initialFormValue,
        fetchDepartment,
        fetchDesignation,
        fetchRole,
        roleData,
        departmentData,
        designationData
    }
}

export default EmployeeModalLogic
