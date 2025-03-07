/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef } from 'react'
import { Grid, Button, TextField, CardContent, Box, Typography, Divider, Skeleton, Avatar, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import DatePicker from 'react-datepicker'
import { motion } from 'framer-motion'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import { Toaster } from 'react-hot-toast'
import useTabInfoData from 'src/hooks/useTabInfoData'
import { cancelButton, inputField, inputLabel, saveButton } from 'src/Styles'

const CustomInput = forwardRef((props, ref) => {
    return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} variant="filled" size='small' sx={{ ...inputField, ...inputLabel }} />
})

const CustomInputJoin = forwardRef((props, ref) => {
    return <TextField inputRef={ref} label='Joining Date' fullWidth {...props} variant="filled" size='small' sx={{ ...inputField, ...inputLabel }} />
})

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(6.25),
    marginBottom: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius,
    border: '1px solid rgba(231, 227, 252, 0.25)',
    padding: '5px',
    [theme.breakpoints.down('sm')]: {
        marginRight: 0
    }
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
    '&.MuiButton-root:hover': {
        backgroundColor: theme.palette.primary.hover
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center'
    }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4.5),
    padding: '20px 25px',
    lineHeight: 0,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
        textAlign: 'center',
        marginTop: theme.spacing(4)
    }
}))

const BoxStyled = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}))

const TypographyHeaderText = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    lineHeight: 'normal',
    letterSpacing: '0.21px',
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold
}))

const TabInfo = () => {
    // ** State
    const {
        date,
        dateJon,
        setDateJon,
        handleChange,
        handleSaveChanges,
        resetProfileImage,
        handleProfileImageUpload,
        imgSrc,
        authToken,
        userData
    } = useTabInfoData()
    const theme = useTheme()

    return (
        <CardContent>
            <Toaster />
            <motion.form
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exist={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.4 }}
            >
                <Grid container spacing={7}>
                    <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                        <BoxStyled>
                            {imgSrc ? (
                                <motion.div
                                    animate={{ opacity: 1 }}
                                    initial={{ opacity: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    <ImgStyled src={imgSrc} alt='Profile Pic' />
                                </motion.div>
                            ) : (
                                <ImgStyled alt='John Doe' src="/images/avatars/default-face.png" />
                            )}
                            <Box>
                                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                                    <PencilOutline />
                                    <input
                                        hidden
                                        type="file"
                                        name="profileImage"
                                        accept="image/*"
                                        onChange={handleProfileImageUpload}
                                        id='account-settings-upload-image'
                                    />
                                </ButtonStyled>
                                {authToken?.role === 'admin' && (
                                    <ResetButtonStyled variant='outlined' onClick={handleSaveChanges} sx={saveButton}>
                                        save
                                    </ResetButtonStyled>
                                )}
                                <ResetButtonStyled color='error' variant='outlined' onClick={resetProfileImage} sx={{ ...cancelButton, ml: 0 }}>
                                    Reset
                                </ResetButtonStyled>
                                <Typography variant='body2' sx={{ marginTop: 5 }}>
                                    Allowed PNG or JPEG. Max size of 800K.
                                </Typography>
                            </Box>
                        </BoxStyled>
                    </Grid>

                    {authToken?.role === 'admin' ? null : (
                        <>
                            <Divider
                                textAlign='center'
                                sx={{
                                    mt: 5,
                                    width: '100%',
                                    lineHeight: 'normal',
                                    textTransform: 'uppercase',
                                    '&:before, &:after': { top: 7, transform: 'none' }
                                }}
                            >
                                <TypographyHeaderText noWrap>Personal Information</TypographyHeaderText>
                            </Divider>
                            {/* <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    label='Bio'
                                    minRows={2}
                                    placeholder='Bio'
                                    defaultValue='The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery experiences.'
                                />
                            </Grid> */}
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    type='text'
                                    label='Employee ID'
                                    name='id'
                                    value={userData.id}
                                    onChange={handleChange}
                                    disabled
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    label='Name'
                                    name='name'
                                    value={userData.name}
                                    onChange={handleChange}
                                    disabled
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <DatePicker
                                    selected={date}
                                    showYearDropdown
                                    showMonthDropdown
                                    id='account-settings-date'
                                    placeholderText='MM-DD-YYYY'
                                    customInput={<CustomInput />}
                                    onChange={date => setDate(date)}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    type='email'
                                    label='Email'
                                    name='email'
                                    value={userData.email}
                                    onChange={handleChange}
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    label='Phone No'
                                    name='mobileNo'
                                    value={userData.mobileNo}
                                    onChange={handleChange}
                                    disabled
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    label='Address'
                                    name='address'
                                    value={userData.address}
                                    onChange={handleChange}
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    label='Department'
                                    name='department'
                                    value={userData.department}
                                    onChange={handleChange}
                                    disabled
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    label='Designation'
                                    name='designation'
                                    value={userData.designation}
                                    onChange={handleChange}
                                    disabled
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    label='Salary'
                                    name='salary'
                                    value={userData.salary}
                                    onChange={handleChange}
                                    disabled
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <DatePicker
                                    selected={dateJon}
                                    showYearDropdown
                                    showMonthDropdown
                                    id='account-settings-date'
                                    placeholderText='MM-DD-YYYY'
                                    customInput={<CustomInputJoin />}
                                    onChange={date => setDateJon(date)}
                                    disabled
                                />
                            </Grid>
                            <Divider
                                textAlign='center'
                                sx={{
                                    mt: 5,
                                    width: '100%',
                                    lineHeight: 'normal',
                                    textTransform: 'uppercase',
                                    '&:before, &:after': { top: 7, transform: 'none' }
                                }}
                            >
                                <TypographyHeaderText noWrap>Bank Detail</TypographyHeaderText>
                            </Divider>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    label='Account Holder Name'
                                    name='bankAccountHolderName'
                                    value={userData.bankAccountHolderName}
                                    onChange={handleChange}
                                    disabled
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    label='Account Number'
                                    name='bankAccountNumber'
                                    value={userData.bankAccountNumber}
                                    onChange={handleChange}
                                    disabled
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    label='Bank Name'
                                    name='bankName'
                                    value={userData.bankName}
                                    onChange={handleChange}
                                    disabled
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    label='Bank Identifier Code (IFSC Code)'
                                    name='bankIFSCCode'
                                    value={userData.bankIFSCCode}
                                    onChange={handleChange}
                                    disabled
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    size='small'
                                    label='Branch Location'
                                    name='bankBranchLocation'
                                    value={userData.bankBranchLocation}
                                    onChange={handleChange}
                                    disabled
                                    sx={{ ...inputField, ...inputLabel }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant='contained'
                                    sx={{
                                        ...saveButton,
                                        '&.MuiButton-root:hover': {
                                            backgroundColor: theme.palette.primary.hover
                                        }
                                    }}
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </motion.form>
        </CardContent>
    )
}

export default TabInfo
