import {
  Box,
  Grid,
  Button,
  Divider,
  InputLabel,
  IconButton,
  CardContent,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  useTheme
} from '@mui/material'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import useForgotPasswordData from 'src/hooks/useForgotPasswordData'

const TabForgotPassword = () => {
  const {
    handleNewPasswordChange,
    handleClickShowNewPassword,
    handleMouseDownNewPassword,
    handleConfirmNewPasswordChange,
    handleClickShowConfirmNewPassword,
    handleMouseDownConfirmNewPassword,
    handleEmployeeName,
    handleChangePassword,
    values,
    setValues,
    userPassword
  } = useForgotPasswordData()
  const theme = useTheme()

  return (
    <motion.form
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exist={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.25 }}
    >
      <Toaster />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Employee</InputLabel>
                  <Select
                    label='Employee'
                    defaultValue=''
                    labelId='form-layouts-separator-select-label'
                    id='name'
                    name='name'
                    value={values.name}
                    onChange={handleEmployeeName('name')}
                  >
                    {userPassword.length === 0 ? (
                      <MenuItem disabled>No Employee</MenuItem>
                    ) : (
                      userPassword.map(user => (
                        <MenuItem key={user.id} value={user.name}>
                          {user.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img alt='avatar' src='/images/pages/secure.svg' width={330} />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>
        <Button
          variant='contained'
          sx={{
            mr: 3.5,
            '&.MuiButton-root:hover': {
              backgroundColor: theme.palette.primary.hover
            }
          }}
          onClick={handleChangePassword}
        >
          Save Changes
        </Button>
        <Button
          type='reset'
          variant='outlined'
          color='secondary'
          onClick={() => setValues({ ...values, employeeId: '', newPassword: '', confirmPassword: '' })}
        >
          Reset
        </Button>
      </CardContent>
    </motion.form>
  )
}

export default TabForgotPassword
