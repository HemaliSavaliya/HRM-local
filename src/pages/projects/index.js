
import React, { useState } from 'react'
import {
  Card,
  Box,
  TextField
} from '@mui/material'
import DocumentModal from 'src/common/DocumentModal'
import { Toaster } from 'react-hot-toast'
import ConfirmationModal from 'src/common/ConfirmationModal'
import ProjectsTable from 'src/views/projects/ProjectsTable'
import ProjectModal from 'src/components/ProjectsModal/ProjectModal'
import useProjectData from 'src/hooks/useProjectData'

const Project = () => {
  const {
    loading,
    projectData,
    editProjectId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    addProjects,
    editProjects,
    updateProjectStatus,
    deleteDocumentData,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteProject,
    handleDeleteProject,
    searchQuery,
    handleSearchChange
  } = useProjectData()

  // For view all file and fetch that
  const [fileData, setFileData] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Function to handle button click and call the API
  const handleButtonClick = async (documentName, id) => {
    try {
      // Retrieve the stored project data from localStorage
      const storedProject = JSON.parse(localStorage.getItem("project"));

      // Find the project and document by ID and name
      const selectedProject = storedProject.find((project) => project.id === id);
      const selectedDocument = selectedProject?.document.find((doc) => doc.path === documentName);

      if (selectedDocument) {
        // Using the preview URL from the localStorage structure
        setFileData(selectedDocument.preview);
        setFileName(documentName);
        setFileId(id);
        setFileType("blob");
        setOpenModal(true);
      } else {
        console.error("Document not found");
      }
    } catch (error) {
      console.error("Error opening document:", error);
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <img src='/images/loader.svg' alt='loader' />
      </div>
    )
  }

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
        onConfirm={confirmDeleteProject}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Project'
        content='Are you sure you want to delete this project?'
      />

      <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
        <Box
          sx={{
            width: '100%',
            display: { xs: 'grid', sm: 'flex', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          mb={4}
        >
          <ProjectModal
            editProjectId={editProjectId}
            projectData={projectData}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addProjects={addProjects}
            editProjects={editProjects}
          />
          <TextField
            sx={{ mt: { xs: 3, sm: 0, lg: 0 } }}
            label='Search Project'
            variant='outlined'
            size='small'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <ProjectsTable
          searchQuery={searchQuery}
          projectData={projectData}
          loading={loading}
          handleEdit={handleEdit}
          handleDeleteProject={handleDeleteProject}
          handleButtonClick={handleButtonClick}
          updateProjectStatus={updateProjectStatus}
        />
      </Card>
    </>
  )
}

export default Project
