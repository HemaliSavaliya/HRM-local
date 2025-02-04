import React from "react";
import { Card, CardHeader, CardContent, Typography, Avatar, Button, Divider, useTheme, Box } from "@mui/material";

const activities = [
    { name: "Matt Morgan", avatar: "images/avatars/1.png", time: "05:30 PM", action: "Added New Project", detail: "HRMS Dashboard" },
    { name: "Jay Ze", avatar: "images/avatars/2.png", time: "05:00 PM", action: "Commented on Uploaded Document" },
    { name: "Mary Donald", avatar: "images/avatars/3.png", time: "05:30 PM", action: "Approved Task Projects" },
    { name: "George David", avatar: "images/avatars/4.png", time: "06:00 PM", action: "Requesting Access to Module Tickets" },
    { name: "Aaron Zeen", avatar: "images/avatars/5.png", time: "06:30 PM", action: "Downloaded App Reports" },
    { name: "Hendry Daniel", avatar: "images/avatars/6.png", time: "05:30 PM", action: "Completed New Project", detail: "HMS" }
];

const RecentActivities = () => {
    const theme = useTheme()

    return (
        <Card sx={{ height: "509px" }}>
            <CardHeader title={<Typography fontSize={16} fontWeight={600}>Recent Activities</Typography>} action={
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        backgroundColor: theme.palette.mode === 'light' ? '#F8F9FA' : '#312d4b',
                        border: theme.palette.mode === "light" ? '1px solid #F8F9FA' : "1px solid #ffffff36",
                        color: theme.palette.mode === 'light' ? '#111827' : '#fff',
                        '&:hover': {
                            border: theme.palette.mode === 'light' ? '1px solid primary.main' : '1px solid #F8F9FA',
                        }
                    }}
                >
                    View All
                </Button>
            } />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                {activities.map((activity, index) => (
                    <Box key={index} style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                        <Avatar src={activity.avatar} />
                        <Box style={{ marginLeft: "10px", flex: 1 }}>
                            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="body1" fontSize={14} fontWeight={600}>{activity.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{activity.time}</Typography>
                            </Box>
                            <Typography variant="body2" fontSize={13}>
                                {activity.action} {activity.detail && <span style={{ color: "primary.main" }}>{activity.detail}</span>}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};

export default RecentActivities;
