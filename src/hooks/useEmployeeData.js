/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useEmployeeData = () => {
    const [employeeData, setEmployeeData] = useState([])
    const [editEmployeeId, setEditEmployeeId] = useState(null)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deleteTargetId, setDeleteTargetId] = useState(null)
    const [open, setOpen] = useState(false)
    const [scroll, setScroll] = useState('body')
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const theme = useTheme()

    // Handle search input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    // Utility function to get Employee from localStorage
    const getEmployeeFromLocalStorage = () => {
        const storedEmployee = localStorage.getItem('employee')
        return storedEmployee ? JSON.parse(storedEmployee) : []
    }

    // Utility function to set Employee in localStorage
    const setEmployeeToLocalStorage = (emp) => {
        localStorage.setItem('employee', JSON.stringify(emp))
    }

    const handleClose = () => {
        setOpen(false)
        setEditEmployeeId(null)
    }

    // for dialog box
    const handleClickOpen = scrollType => () => {
        setOpen(true)
        setScroll(scrollType)
    }

    const handleEdit = id => {
        setEditEmployeeId(id)
        setOpen(true)
    }

    const initializeEmployees = () => {
        const employees = [
            {
                id: Date.now() + Math.random(),
                name: "Winter Stone",
                password: "Pa$$w0rd!",
                email: "jitegojydi@mailinator.com",
                mobileNo: "3456789098",
                alternateNumber: "",
                address: "Aut similique sed su",
                designation: "HR Manager",
                department: "Human Resources",
                joiningDate: "2023-06-08",
                birthDate: "1977-10-18",
                gender: "Male",
                bloodGroup: "A+",
                role: "hr",
                status: "Active",
                salary: "20000",
                bankAccountHolderName: "Barclay Burch",
                bankAccountNumber: "410789009876",
                bankName: "Callie Lara",
                bankIFSCCode: "ICIC0000789",
                bankBranchLocation: "Ipsum provident vo",
                showPassword: false,
                governmentDocument: [
                    {
                        name: "category_img_3.png",
                        data: "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
                    }
                ]
            },
            {
                id: Date.now() + Math.random(),
                name: "John Doe",
                password: "Pa$$w0rd!",
                email: "john.doe@mailinator.com",
                mobileNo: "1234567890",
                alternateNumber: "",
                address: "Street 123, City ABC",
                designation: "Finance Manager",
                department: "Finance",
                joiningDate: "2023-05-15",
                birthDate: "1980-03-22",
                gender: "Male",
                bloodGroup: "B+",
                role: "employee",
                status: "Active",
                salary: "25000",
                bankAccountHolderName: "John Doe",
                bankAccountNumber: "410789012345",
                bankName: "XYZ Bank",
                bankIFSCCode: "XYZB0000123",
                bankBranchLocation: "City ABC",
                showPassword: false,
                governmentDocument: [
                    {
                        name: "id_doc.png",
                        data: "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
                    }
                ]
            },
            {
                id: Date.now() + Math.random(),
                name: "Jane Smith",
                password: "Pa$$w0rd!",
                email: "jane.smith@mailinator.com",
                mobileNo: "2345678901",
                alternateNumber: "",
                address: "Street 456, City DEF",
                designation: "Marketing Manager",
                department: "Marketing",
                joiningDate: "2023-04-10",
                birthDate: "1985-07-19",
                gender: "Female",
                bloodGroup: "O+",
                role: "manager",
                status: "Active",
                salary: "23000",
                bankAccountHolderName: "Jane Smith",
                bankAccountNumber: "410789023456",
                bankName: "ABC Bank",
                bankIFSCCode: "ABCB0000456",
                bankBranchLocation: "City DEF",
                showPassword: false,
                governmentDocument: [
                    {
                        name: "passport.png",
                        data: "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
                    }
                ]
            },
            {
                id: Date.now() + Math.random(),
                name: "Alice Johnson",
                password: "Pa$$w0rd!",
                email: "alice.johnson@mailinator.com",
                mobileNo: "3456789012",
                alternateNumber: "",
                address: "Street 789, City GHI",
                designation: "IT Manager",
                department: "IT",
                joiningDate: "2023-03-20",
                birthDate: "1990-01-30",
                gender: "Female",
                bloodGroup: "AB+",
                role: "hr",
                status: "Active",
                salary: "27000",
                bankAccountHolderName: "Alice Johnson",
                bankAccountNumber: "410789034567",
                bankName: "DEF Bank",
                bankIFSCCode: "DEFB0000678",
                bankBranchLocation: "City GHI",
                showPassword: false,
                governmentDocument: [
                    {
                        name: "driver_license.png",
                        data: "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
                    }
                ]
            },
            {
                id: Date.now() + Math.random(),
                name: "Bob Brown",
                password: "Pa$$w0rd!",
                email: "bob.brown@mailinator.com",
                mobileNo: "4567890123",
                alternateNumber: "",
                address: "Street 101, City JKL",
                designation: "Sales Manager",
                department: "Sales",
                joiningDate: "2023-02-25",
                birthDate: "1988-12-25",
                gender: "Male",
                bloodGroup: "O-",
                role: "hr",
                status: "Active",
                salary: "24000",
                bankAccountHolderName: "Bob Brown",
                bankAccountNumber: "410789045678",
                bankName: "GHI Bank",
                bankIFSCCode: "GHIB0000789",
                bankBranchLocation: "City JKL",
                showPassword: false,
                governmentDocument: [
                    {
                        name: "insurance_card.png",
                        data: "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
                    }
                ]
            },
            {
                id: Date.now() + Math.random(),
                name: "Carol White",
                password: "Pa$$w0rd!",
                email: "carol.white@mailinator.com",
                mobileNo: "5678901234",
                alternateNumber: "",
                address: "Street 202, City MNO",
                designation: "Operations Manager",
                department: "Operations",
                joiningDate: "2023-01-15",
                birthDate: "1985-11-15",
                gender: "Female",
                bloodGroup: "A-",
                role: "employee",
                status: "Active",
                salary: "26000",
                bankAccountHolderName: "Carol White",
                bankAccountNumber: "410789056789",
                bankName: "JKL Bank",
                bankIFSCCode: "JKLB0000901",
                bankBranchLocation: "City MNO",
                showPassword: false,
                governmentDocument: [
                    {
                        name: "aadhaar_card.png",
                        data: "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
                    }
                ]
            },
            {
                id: Date.now() + Math.random(),
                name: "Dave Clark",
                password: "Pa$$w0rd!",
                email: "dave.clark@mailinator.com",
                mobileNo: "6789012345",
                alternateNumber: "",
                address: "Street 303, City PQR",
                designation: "Customer Service Manager",
                department: "Customer Service",
                joiningDate: "2022-12-10",
                birthDate: "1982-10-05",
                gender: "Male",
                bloodGroup: "B-",
                role: "employee",
                status: "Active",
                salary: "22000",
                bankAccountHolderName: "Dave Clark",
                bankAccountNumber: "410789067890",
                bankName: "MNO Bank",
                bankIFSCCode: "MNOB0000123",
                bankBranchLocation: "City PQR",
                showPassword: false,
                governmentDocument: [
                    {
                        name: "pan_card.png",
                        data: "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
                    }
                ]
            },
            {
                id: Date.now() + Math.random(),
                name: "Eve Martinez",
                password: "Pa$$w0rd!",
                email: "eve.martinez@mailinator.com",
                mobileNo: "5678908765",
                alternateNumber: "4532345678",
                address: "Street 303, City PQR",
                designation: "Customer Service Manager",
                department: "Customer Service",
                joiningDate: "2022-12-10",
                birthDate: "1982-10-05",
                gender: "Male",
                bloodGroup: "B-",
                role: "employee",
                status: "Active",
                salary: "22000",
                bankAccountHolderName: "Dave Clark",
                bankAccountNumber: "410789067890",
                bankName: "MNO Bank",
                bankIFSCCode: "ICIC0000123",
                bankBranchLocation: "City PQR",
                showPassword: false,
                governmentDocument: [
                    {
                        name: "pan_card.png",
                        data: "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
                    }
                ]
            },
            {
                id: Date.now() + Math.random(),
                name: "Michael Johnson",
                password: "Pa$$w0rd!",
                email: "michael.johnson@mailinator.com",
                mobileNo: "9876543210",
                alternateNumber: "",
                address: "123 Main St, City XYZ",
                designation: "HR Manager",
                department: "Human Resources",
                joiningDate: "2023-06-08",
                birthDate: "1977-10-18",
                gender: "Male",
                bloodGroup: "A+",
                role: "hr",
                status: "Active",
                salary: "20000",
                bankAccountHolderName: "Michael Johnson",
                bankAccountNumber: "410789009876",
                bankName: "XYZ Bank",
                bankIFSCCode: "XYZB0000789",
                bankBranchLocation: "City XYZ",
                showPassword: false,
                governmentDocument: [{
                    name: "category_img_3.png",
                    data: "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
                }]
            },
            {
                id: Date.now() + Math.random(),
                name: "Emily Davis",
                password: "Pa$$w0rd!",
                email: "emily.davis@mailinator.com",
                mobileNo: "1234567890",
                alternateNumber: "",
                address: "456 Elm St, City ABC",
                designation: "Finance Manager",
                department: "Finance",
                joiningDate: "2023-05-15",
                birthDate: "1985-02-24",
                gender: "Female",
                bloodGroup: "B+",
                role: "manager",
                status: "Active",
                salary: "25000",
                bankAccountHolderName: "Emily Davis",
                bankAccountNumber: "410789012345",
                bankName: "ABC Bank",
                bankIFSCCode: "ABCB0000123",
                bankBranchLocation: "City ABC",
                showPassword: false,
                governmentDocument: [{
                    name: "id_doc.png",
                    data: "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
                }]
            }
        ];

        setEmployeeToLocalStorage(employees)
        setEmployeeData(employees)
    }

    const fetchData = async () => {
        const employee = getEmployeeFromLocalStorage()
        setEmployeeData(employee)
        setLoading(false)
    }

    useEffect(() => {
        if (!getEmployeeFromLocalStorage().length) {
            initializeEmployees(); // Initialize employees if none exist in localStorage
        } else {
            fetchData()
        }
    }, [])

    // Function to add form data to localStorage
    const addEmployee = async newEmployee => {
        const employee = getEmployeeFromLocalStorage()

        // Add a unique ID and today's date to each new role
        const updatedEmployee = [...employee, { ...newEmployee, id: Date.now() }]
        setEmployeeToLocalStorage(updatedEmployee)
        setEmployeeData(updatedEmployee)

        toast.success('Employee Added Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })

        setOpen(false)
    }

    const editEmployee = async (updatedData) => {
        const employee = getEmployeeFromLocalStorage()

        // Find the employee and merge the existing documents with the new ones
        const updatedEmployee = employee.map((emp) => {
            if (emp.id === updatedData.id) {
                return {
                    // ...emp,
                    ...updatedData,
                    governmentDocument: [...(updatedData.governmentDocument || [])], // Merge existing and new documents
                };
            }

            return emp;
        });

        setEmployeeToLocalStorage(updatedEmployee)
        setEmployeeData(updatedEmployee)

        toast.success('Employee Updated Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })

        setOpen(false)
        setEditEmployeeId(null)
    }

    const handleDeleteEmployee = id => {
        setDeleteTargetId(id)
        setDeleteModalOpen(true)
    }

    const confirmDeleteEmployee = () => {
        if (deleteTargetId) {
            deleteEmployee(deleteTargetId)
            setDeleteModalOpen(false)
        }
    }

    const deleteEmployee = async id => {
        // Get the current list of Employee from localStorage
        const employee = getEmployeeFromLocalStorage()

        // Filter out the Employee that needs to be deleted
        const updatedEmployee = employee.filter(emp => emp.id !== id)

        // Update localStorage with the new list
        setEmployeeToLocalStorage(updatedEmployee)

        // Update the state to reflect changes in the UI
        setEmployeeData(updatedEmployee)

        // Show success message
        toast.success('Employee Deleted Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })
    }

    // Function to delete specified employee document data from database
    const deleteDocumentData = async (fileName, empId) => {
        // Get the current list of employee from localStorage
        const employee = getEmployeeFromLocalStorage()

        // Find the employee by id
        const updatedEmployee = employee.map((emp) => {
            if (emp.id === empId) {
                // Remove the document with the matching fileName from the document array
                const updatedDocuments = emp.governmentDocument.filter(doc => doc.name !== fileName)

                return { ...emp, governmentDocument: updatedDocuments }
            }
            return emp
        })

        // Update localStorage with the modified list of employee
        setEmployeeToLocalStorage(updatedEmployee)

        // Update the state to reflect changes in the UI
        setEmployeeData(updatedEmployee)

        // Show success message
        toast.success('Employee Document Deleted Successfully!', {
            duration: 2000,
            position: 'top-center',
            style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '15px'
            }
        })
    }

    return {
        loading,
        employeeData,
        editEmployeeId,
        addEmployee,
        editEmployee,
        deleteEmployee,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        deleteDocumentData,
        deleteModalOpen,
        setDeleteModalOpen,
        confirmDeleteEmployee,
        handleDeleteEmployee,
        searchQuery,
        handleSearchChange
    }
}

export default useEmployeeData
