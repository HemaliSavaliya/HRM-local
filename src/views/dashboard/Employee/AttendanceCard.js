import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    CircularProgress,
    Button,
    Badge,
} from '@mui/material';
import { Fingerprint } from 'mdi-material-ui';

const AttendanceCard = () => {
    const progressValue = 65; // Example value for progress

    return (
        <Box sx={{ display: 'flex', flex: 1 }}>
            <Card sx={{ flex: 1, border: '1px solid', borderColor: 'primary.main', background: 'linear-gradient(180deg, #FFF8F4 0%, #FFFFFF 100%)' }}>
                <CardContent>
                    <Box mb={4} textAlign="center">
                        <Typography color="#6B7280" fontWeight={500} fontSize={14} gutterBottom>
                            Attendance
                        </Typography>
                        <Typography fontSize={18} fontWeight={600} color={'#202C4B'}>08:35 AM, 11 Mar 2025</Typography>
                    </Box>

                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 3,
                            mx: 'auto',
                        }}
                    >
                        <CircularProgress
                            variant="determinate"
                            value={progressValue}
                            size={120}
                            thickness={1}
                            sx={{
                                color: 'success.main',
                            }}
                        />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="body2" color="textSecondary">
                                Total Hours
                            </Typography>
                            <Typography variant="h6">5:45:32</Typography>
                        </Box>
                    </Box>

                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} textAlign="center" mb={3}>
                        <Box sx={{
                            background: '#212529',
                            color: '#FFF',
                            fontSize: '12px',
                            padding: '5px 12px',
                            lineHeight: 1.5,
                            width: '155px',
                            height: '28px',
                            marginTop: '10px',
                            borderRadius: '4px'
                        }}>
                            Production : 3.45 hrs
                        </Box>
                        <Typography
                            fontWeight={500}
                            fontSize={14}
                            mt={5}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            mb={5}
                        >
                            <Fingerprint color="primary" sx={{ mr: 1 }} /> Punch In at 10.00 AM
                        </Typography>
                        <Button variant="contained" color="primary" fullWidth>
                            Punch Out
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AttendanceCard;
