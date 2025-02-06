import {
  Box,
  Card,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import ConfirmationModal from 'src/common/ConfirmationModal'
import DocumentModal from 'src/common/DocumentModal'
import EmployeeModal from 'src/components/EmployeeModal/EmployeeModal'
import useEmployeeData from 'src/hooks/useEmployeeData'
import { inputField, inputLabel } from 'src/Styles'
import EmployeeTable from 'src/views/employee/EmployeeTable'

const Employee = () => {
  const {
    loading,
    addEmployee,
    editEmployee,
    editEmployeeId,
    employeeData,
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
  } = useEmployeeData()

  // For view all file and fetch that
  const [fileData, setFileData] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleButtonClick = (documentName, id) => {
    try {
      // Retrieve the stored employee data from localStorage
      const storedEmployee = JSON.parse(localStorage.getItem("employee"));

      // Find the employee and document by ID and name
      const selectedEmployee = storedEmployee.find((employee) => employee.id === id);
      const selectedDocument = selectedEmployee?.governmentDocument.find((doc) => doc.name === documentName);

      if (selectedDocument) {
        setFileData(selectedDocument.data); // This should be the Base64 string
        setFileName(selectedDocument.name);
        setFileId(id);
        setFileType(selectedDocument.type || 'image/jpeg'); // Set the type based on your document structure
        setOpenModal(true);
      } else {
        console.error("Document not found");
      }
    } catch (error) {
      console.error("Error opening document:", error);
    }
  };

  return (
    <>
      <Toaster />

      <DocumentModal
        fileData={fileData}
        fileType={fileType}
        fileName={fileName}
        open={openModal}
        onClose={() => setOpenModal(false)}
        scroll={scroll}
        deleteDocumentData={deleteDocumentData}
        fileId={fileId}
      />

      <ConfirmationModal
        open={deleteModalOpen}
        onConfirm={confirmDeleteEmployee}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Employee'
        content='Are you sure you want to delete this employee?'
      />

      <Card sx={{ p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
        <Box
          sx={{
            width: '100%',
            display: { xs: 'grid', sm: 'flex', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          mb={4}
        >
          <EmployeeModal
            editEmployeeId={editEmployeeId}
            employeeData={employeeData}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addEmployee={addEmployee}
            editEmployee={editEmployee}
          />
          <TextField
            sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...inputField, ...inputLabel }}
            label='Search Employee'
            variant='filled'
            size='small'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <EmployeeTable
          searchQuery={searchQuery}
          employeeData={employeeData}
          loading={loading}
          handleEdit={handleEdit}
          handleDeleteEmployee={handleDeleteEmployee}
          handleButtonClick={handleButtonClick}
        />
      </Card>
    </>
  )
}

export default Employee