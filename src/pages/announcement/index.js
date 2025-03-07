import React, { useState } from 'react'
import {
    Card,
    Box,
    TextField,
} from '@mui/material'
import useAnnouncementData from 'src/hooks/useAnnouncementData'
import AnnouncementModal from 'src/components/AnnouncementModal/AnnouncementModal'
import DocumentModal from 'src/common/DocumentModal'
import { Toaster } from 'react-hot-toast'
import ConfirmationModal from 'src/common/ConfirmationModal'
import AnnouncementTable from 'src/views/announcement/AnnouncementTable'
import { inputField, inputLabel } from 'src/Styles'

const Announcement = () => {
    const {
        loading,
        announcementData,
        editAnnoId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        addAnnouncement,
        editAnnouncement,
        deleteDocumentData,
        deleteModalOpen,
        setDeleteModalOpen,
        confirmDeleteAnnouncement,
        handleDeleteAnnouncement,
        searchQuery,
        handleSearchChange
    } = useAnnouncementData()

    // For view all file and fetch that
    const [fileData, setFileData] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [fileId, setFileId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleButtonClick = (documentName, id) => {
        try {
            const storedAnnouncements = JSON.parse(localStorage.getItem("announcement"));
            const selectedAnnouncement = storedAnnouncements.find((announcement) => announcement.id === id);
            const selectedDocument = selectedAnnouncement?.document.find((doc) => doc.name === documentName);

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
                onConfirm={confirmDeleteAnnouncement}
                onClose={() => setDeleteModalOpen(false)}
                title='Delete Announcement'
                content='Are you sure you want to delete this announcement?'
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
                    <AnnouncementModal
                        editAnnoId={editAnnoId}
                        announcementData={announcementData}
                        open={open}
                        setOpen={setOpen}
                        scroll={scroll}
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}
                        addAnnouncement={addAnnouncement}
                        editAnnouncement={editAnnouncement}
                    />
                    <TextField
                        sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...inputField, ...inputLabel }}
                        label='Search Announcement'
                        variant='filled'
                        size='small'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Box>

                <AnnouncementTable
                    searchQuery={searchQuery}
                    announcementData={announcementData}
                    loading={loading}
                    handleEdit={handleEdit}
                    handleDeleteAnnouncement={handleDeleteAnnouncement}
                    handleButtonClick={handleButtonClick}
                />
            </Card>
        </>
    )
}

export default Announcement
