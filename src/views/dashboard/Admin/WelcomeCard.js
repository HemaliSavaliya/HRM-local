import { Avatar, Box, Card, CardContent, Link, Typography } from '@mui/material'
import { Pencil } from 'mdi-material-ui'
import React from 'react'

const WelcomeCard = () => {
    return (
        <Card elevation={0} sx={{ border: "none", mt: 6, padding: "0", backgroundColor: "transparent", boxShadow: "none" }}>
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", p: 0, pb: '0px !important' }}>
                <Box display="flex" alignItems="center">
                    <Avatar src="images/avatars/avatar-7.png" sx={{ width: 56, height: 56 }} />
                    <Box ml={2}>
                        <Typography mb={1} sx={{ fontSize: { xs: 13, sm: 18, md: 20, lg: 20 } }} fontWeight={600} display="flex" alignItems="center">
                            Welcome Back, Adrian
                            <Link href="#" sx={{ ml: 4, display: "flex", alignItems: "center" }}>
                                <Pencil fontSize="small" />
                            </Link>
                        </Typography>
                        <Typography  sx={{ fontSize: { xs: 11, sm: 14, md: 14, lg: 14 } }}>
                            You have <Link href="#" color="primary" fontWeight={600}>21</Link> Pending Approvals &{' '}
                            <Link href="#" color="primary" fontWeight={600}>14</Link> Leave Requests
                        </Typography>
                    </Box>
                </Box>
                {/* <Box display="flex" alignItems="center" flexWrap="wrap" mb={1}>
                    <Button variant="contained" color="secondary" sx={{ mr: 2, mb: 1 }} startIcon={<AddIcon />}>
                        Add Project
                    </Button>
                    <Button variant="contained" color="primary" sx={{ mb: 1 }} startIcon={<AddIcon />}>
                        Add Requests
                    </Button>
                </Box> */}
            </CardContent>
        </Card>
    )
}

export default WelcomeCard
