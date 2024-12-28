import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'

const UserInfo = () => {
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
            {/* Card Header */}
            <CardHeader
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    padding: '1rem 1.25rem 1rem',
                }}
                avatar={
                    <Avatar
                        src="/images/avatars/1.png"
                        alt="Stephan Peralt"
                        sx={{
                            width: 45,
                            height: 45,
                            border: '2px solid white',
                        }}
                    />
                }
                title={
                    <Typography fontSize={'16px'} color={'white'} fontWeight={600} mb={1}>
                        Stephan Peralt
                    </Typography>
                }
                subheader={
                    <Box>
                        <Typography color={'white'} fontSize={12}>
                            Senior Product Designer
                        </Typography>
                    </Box>
                }
            />
            {/* Card Body */}
            <CardContent sx={{ paddingTop: '20px !important', paddingBottom: '20px' }}>
                <Box mb={3}>
                    <Typography variant="caption" mb={0.5} fontWeight={600}>
                        Phone Number
                    </Typography>
                    <Typography variant="body2" color="black">
                        +1 324 3453 545
                    </Typography>
                </Box>
                <Box mb={3}>
                    <Typography variant="caption" mb={0.5} fontWeight={600}>
                        Email Address
                    </Typography>
                    <Typography variant="body2" color="black">
                        <a
                            href="mailto:stephan@example.com"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            stephan@example.com
                        </a>
                    </Typography>
                </Box>
                <Box mb={3}>
                    <Typography variant="caption" mb={0.5} fontWeight={600}>
                        Report Office
                    </Typography>
                    <Typography variant="body2" color="black">
                        Doglas Martini
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" mb={0.5} fontWeight={600}>
                        Joined on
                    </Typography>
                    <Typography variant="body2" color="black">
                        15 Jan 2024
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default UserInfo
