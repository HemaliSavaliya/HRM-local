import React from 'react';
import {
    Card,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import { ArrowUp, ClockCheckOutline } from 'mdi-material-ui';

const TotalHoursCard = () => {
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
                        backgroundColor: '#F26522',
                        border: '1px solid #F26522',
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
                    <ClockCheckOutline fontSize='small' />
                </Avatar>
                <Typography fontSize={20} fontWeight={700} textAlign={"justify"} gutterBottom>
                    8.36 / <Typography component="span" fontSize={20} color="textSecondary">9</Typography>
                </Typography>
                <Typography color="textSecondary" whiteSpace={'normal'} fontWeight={500} fontSize={14} overflow={'hidden'} textOverflow={'ellipsis'} textAlign={'left'} sx={{
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                }}>
                    Total Hours Today
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
                <Typography fontSize={11}>5% This Week</Typography>
            </Box>
        </Card>
    );
};

export default TotalHoursCard;
