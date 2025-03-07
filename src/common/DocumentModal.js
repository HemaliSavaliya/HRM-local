import { Dialog, DialogTitle, Button, DialogContent, CardContent, CardActions, Divider, Box, useTheme } from '@mui/material'
import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { cancelButton, saveButton } from 'src/Styles'

const DocumentModal = ({ fileData, fileType, fileName, open, onClose, scroll, deleteDocumentData, fileId }) => {
    const descriptionElementRef = useRef(null)
    const theme = useTheme()

    useEffect(() => {
        const { current: descriptionElement } = descriptionElementRef
        if (descriptionElement !== null) {
            descriptionElement.focus()
        }
    }, [])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll={scroll}
            aria-labelledby='scroll-dialog-title'
            aria-describedby='scroll-dialog-description'
        >
            <DialogTitle id='scroll-dialog-title'>Document Viewer</DialogTitle>
            <Divider sx={{ margin: 0 }} />
            <DialogContent dividers>
                <Box id='scroll-dialog-description' ref={descriptionElementRef} tabIndex={-1} sx={{ paddingBottom: 2 }}>
                    <CardContent sx={{ padding: 0, paddingBottom: 5 }}>
                        {fileData ? (
                            fileType === 'pdf' ? (
                                <object data={fileData} type='application/pdf' width='100%' height='350px' style={{ border: 'none' }}>
                                    <Box>
                                        Your browser does not support PDFs. Please download the PDF to view it:{' '}
                                        <a href={fileData}>Download PDF</a>
                                    </Box>
                                </object>
                            ) : fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/jpg' ? (
                                <img width={'100%'} height={300} src={fileData} alt={fileName} />
                            ) : fileType === 'pptx' || fileType === 'docx' || fileType === 'xlsx' ? (
                                <>
                                    <Box>
                                        To view the document, download it using the link below and open it using the appropriate
                                        application.
                                    </Box>
                                    <Button variant='outlined' color='primary' href={fileData} download sx={{ mt: 2 }}>
                                        Download ({fileName}) File
                                    </Button>
                                </>
                            ) : (
                                <Box>Unsupported file type.</Box>
                            )
                        ) : (
                            <Box>No file data available.</Box>
                        )}
                    </CardContent>
                    <Divider sx={{ margin: 0 }} />
                    <CardActions sx={{ paddingBottom: 0, paddingLeft: 0 }}>
                        <Button
                            size='large'
                            type='submit'
                            sx={{
                                ...saveButton,
                                '&.MuiButton-root:hover': {
                                    backgroundColor: theme.palette.primary.hover
                                }
                            }}
                            variant='contained'
                            onClick={() => {
                                // Call deleteDocumentData with fileName and fileId (announcementId)
                                deleteDocumentData(fileName, fileId)
                                onClose() // Close modal after deleting
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            size='large'
                            color='secondary'
                            variant='outlined'
                            onClick={onClose}
                            sx={cancelButton}
                        >
                            Cancel
                        </Button>
                    </CardActions>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

// Prop types validation
DocumentModal.propTypes = {
    fileData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    fileType: PropTypes.string,
    fileName: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    scroll: PropTypes.string.isRequired,
    deleteDocumentData: PropTypes.func.isRequired,
    fileId: PropTypes.number // Make fileId optional
}

export default DocumentModal
