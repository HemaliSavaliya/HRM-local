import React from 'react';
import { Box, Card, Typography, Avatar, Button, Divider } from '@mui/material';
import { ChatOutline, EmailOutline, PhoneOutline } from 'mdi-material-ui';

const TeamMembers = () => {
    const teamMembers = [
        {
            name: 'Alexander Jermai',
            role: 'UI/UX Designer',
            img: '/images/avatars/1.png',
        },
        {
            name: 'Doglas Martini',
            role: 'Product Designer',
            img: '/images/avatars/2.png',
        },
        {
            name: 'Daniel Esbella',
            role: 'Project Manager',
            img: '/images/avatars/3.png',
        },
        {
            name: 'Daniel Esbella',
            role: 'Team Lead',
            img: '/images/avatars/4.png',
        },
        {
            name: 'Stephan Peralt',
            role: 'Team Lead',
            img: '/images/avatars/5.png',
        },
        {
            name: 'Andrew Jermia',
            role: 'Project Lead',
            img: '/images/avatars/6.png',
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
                <Typography fontSize={16} fontWeight={600}>Team Members</Typography>
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
                {teamMembers.map((member, index) => (
                    <Box
                        key={index}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={4}
                    >
                        {/* Member Info */}
                        <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
                            <Avatar
                                src={member.img}
                                alt={member.name}
                                sx={{ width: 42, height: 42, border: '2px solid', borderColor: 'divider' }}
                            />
                            <Box ml={2}>
                                <Typography
                                    sx={{
                                        whiteSpace: 'normal',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        display: '-webkit-box',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            color: 'primary.main'
                                        }
                                    }}
                                >
                                    {member.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {member.role}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Action Buttons */}
                        <Box display="flex" alignItems="center">
                            <Button
                                sx={{
                                    width: 28,
                                    height: 28,
                                    backgroundColor: '#F8F9FA',
                                    border: '1px solid #F8F9FA',
                                    color: '#111827',
                                    padding: '4px 8px',
                                    minWidth: 28,
                                    mr: 2
                                }}
                            >
                                <PhoneOutline sx={{ fontSize: 12 }} />
                            </Button>
                            <Button
                                sx={{
                                    width: 28,
                                    height: 28,
                                    backgroundColor: '#F8F9FA',
                                    border: '1px solid #F8F9FA',
                                    color: '#111827',
                                    padding: '4px 8px',
                                    minWidth: 28,
                                    mr: 2
                                }}
                            >
                                <EmailOutline sx={{ fontSize: 12 }} />
                            </Button>
                            <Button
                                sx={{
                                    width: 28,
                                    height: 28,
                                    backgroundColor: '#F8F9FA',
                                    border: '1px solid #F8F9FA',
                                    color: '#111827',
                                    padding: '4px 8px',
                                    minWidth: 28,
                                }}
                            >
                                <ChatOutline sx={{ fontSize: 12 }} />
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Card>
    );
};

export default TeamMembers;
