import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import { ArrowDown, CalendarImport } from 'mdi-material-ui';

const TotalHoursMonth = () => {
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
                        backgroundColor: '#1B84FF',
                        border: '1px solid #1B84FF',
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
                    <CalendarImport fontSize='small' />
                </Avatar>
                <Typography fontSize={20} fontWeight={700} textAlign={"justify"} gutterBottom>
                    75 / <Typography component="span" fontSize={20} color="textSecondary">98</Typography>
                </Typography>
                <Typography color="textSecondary" whiteSpace={'normal'} fontWeight={500} fontSize={14} overflow={'hidden'} textOverflow={'ellipsis'} textAlign={'left'} sx={{
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                }}>
                    Total Hours Month
                </Typography>
            </Box>

            <Box display="flex" alignItems="center" fontSize="13px">
                <Avatar
                    sx={{
                        bgcolor: 'error.main',
                        width: 24,
                        height: 24,
                        mr: 2,
                    }}
                >
                    <ArrowDown fontSize="small" sx={{ color: "white" }} />
                </Avatar>
                <Typography fontSize={11}>8% This Month</Typography>
            </Box>
        </Card>
    );
};

export default TotalHoursMonth;
