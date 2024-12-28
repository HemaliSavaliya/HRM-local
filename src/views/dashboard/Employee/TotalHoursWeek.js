import React from 'react';
import {
    Card,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import { ArrowUp, ClockPlusOutline } from 'mdi-material-ui';

const TotalHoursWeek = () => {
    return (
        <Card sx={{ padding: 5, height: '100%' }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    mb: 3,
                    pb: 2,
                    textAlign: 'center',
                }}
            >
                <Avatar
                    sx={{
                        backgroundColor: '#212529',
                        border: '1px solid #212529',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        color: '#FFF',
                        fontWeight: 500,
                        mb: 2,
                        width: 30,
                        height: 30
                    }}
                >
                    <ClockPlusOutline fontSize='small' />
                </Avatar>
                <Typography fontSize={20} fontWeight={700} textAlign={"justify"} gutterBottom>
                    10 / <Typography component="span" fontSize={20} color="textSecondary">40</Typography>
                </Typography>
                <Typography color="textSecondary" whiteSpace={'normal'} fontWeight={500} fontSize={14} overflow={'hidden'} textOverflow={'ellipsis'} textAlign={'left'} sx={{
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                }}>
                    Total Hours Week
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" fontSize="13px">
                <Avatar
                    sx={{
                        bgcolor: 'success.main',
                        width: 24,
                        height: 24,
                        mr: 2,
                    }}
                >
                    <ArrowUp fontSize="small" sx={{ color: "white" }} />
                </Avatar>
                <Typography fontSize={11}>7% This Week</Typography>
            </Box>
        </Card>
    );
};

export default TotalHoursWeek;
