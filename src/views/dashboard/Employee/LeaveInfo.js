import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography, useTheme } from '@mui/material';
import React from 'react'

const LeaveInfo = () => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                height: {
                    xs: 'auto', // Small screens
                    sm: 'auto', // Medium screens
                    md: 'auto', // Large screens
                    lg: '390px', // Large screens
                },
            }}
        >
            <CardHeader
                title={<Typography fontSize={16} fontWeight={600}>Leave Details</Typography>}
            />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Total Leaves</Typography>
                            <Typography fontSize={18} fontWeight={600}>16</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Taken</Typography>
                            <Typography fontSize={18} fontWeight={600}>10</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Absent</Typography>
                            <Typography fontSize={18} fontWeight={600}>2</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Request</Typography>
                            <Typography fontSize={18} fontWeight={600}>0</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Worked Days</Typography>
                            <Typography fontSize={18} fontWeight={600}>240</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Loss of Pay</Typography>
                            <Typography fontSize={18} fontWeight={600}>2</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            // color="primary"
                            fullWidth
                            sx={{
                                '&.MuiButton-root:hover': {
                                    backgroundColor: theme.palette.primary.hover
                                }
                            }}
                            onClick={() => console.log('Apply New Leave')}
                        >
                            Apply New Leave
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default LeaveInfo
