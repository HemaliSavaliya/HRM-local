import React from 'react';
import { Box, Card, Typography, Avatar, Button, Divider } from '@mui/material';

const Notifications = () => {
    const notifications = [
        {
            user: 'Lex Murphy',
            message: 'requested access to UNIX',
            time: 'Today at 9:42 AM',
            img: '/images/avatars/1.png',
            attachment: {
                name: 'EY_review.pdf',
                img: '/image/avatars/1.pngvg',
            },
        },
        {
            user: 'Lex Murphy',
            message: 'requested access to UNIX',
            time: 'Today at 10:00 AM',
            img: '/images/avatars/2.png',
        },
        {
            user: 'Lex Murphy',
            message: 'requested access to UNIX',
            time: 'Today at 10:50 AM',
            img: '/images/avatars/4.png',
            actions: true,
        },
        {
            user: 'Lex Murphy',
            message: 'requested access to UNIX',
            time: 'Today at 12:00 PM',
            img: '/images/avatars/7.png',
        },
        {
            user: 'Lex Murphy',
            message: 'requested access to UNIX',
            time: 'Today at 05:00 PM',
            img: '/images/avatars/8.png',
        },
    ];

    return (
        <Card>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
            }}>
                <Typography fontSize={16} fontWeight={600}>Notifications</Typography>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        backgroundColor: '#F8F9FA',
                        border: '1px solid #F8F9FA',
                        color: '#111827'
                    }}
                >
                    View All
                </Button>
            </Box>
            <Divider sx={{ m: 0 }} />
            <Box padding={'15px'}>
                {notifications.map((notification, index) => (
                    <Box
                        key={index}
                        display="flex"
                        alignItems="start"
                        mb={4}
                    >
                        {/* User Avatar */}
                        <Avatar
                            src={notification.img}
                            alt={notification.user}
                            sx={{ width: 42, height: 42, border: '2px solid', borderColor: 'divider', flexShrink: 0 }}
                        />
                        <Box ml={2}>
                            <Typography
                                sx={{
                                    whiteSpace: 'normal',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                    display: '-webkit-box',
                                    fontSize: 14,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    fontWeight: 500
                                }}
                            >
                                {notification.user} {notification.message}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" mb={2}>
                                {notification.time}
                            </Typography>

                            {/* Attachment */}
                            {notification.attachment && (
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Avatar
                                        src={notification.attachment.img}
                                        alt={notification.attachment.name}
                                        sx={{ width: 32, height: 32, mr: 2 }}
                                    />
                                    <Typography variant="body2">
                                        <a href="#">{notification.attachment.name}</a>
                                    </Typography>
                                </Box>
                            )}

                            {/* Actions */}
                            {notification.actions && (
                                <Box display="flex" alignItems="center">
                                    <Button variant="contained" size="small" color="primary" sx={{ mr: 2 }}>
                                        Approve
                                    </Button>
                                    <Button variant="outlined" size="small" color="primary">
                                        Decline
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Card>
    )
}

export default Notifications
