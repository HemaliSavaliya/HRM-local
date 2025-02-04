import React, { useState } from "react";
import { Card, CardHeader, CardContent, Typography, Box, IconButton, Menu, MenuItem, Avatar, AvatarGroup, Divider, useTheme } from "@mui/material";
import { CalendarBlankOutline } from "mdi-material-ui";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
const AttendanceChart = dynamic(() => import('./charts/AttendanceChart'), { ssr: false });

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    background: 'rgb(224, 242, 254)',
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.background.paper}`,
    cursor: 'pointer',
    '&:hover': {
        zIndex: 1,
        transform: 'translateY(-0.188rem)'
    }
}));

const AttendanceOverview = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState("This Week");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (period) => {
        if (period) setSelectedPeriod(period);
        setAnchorEl(null);
    };

    return (
        <Card sx={{ flex: 1, height: "481px" }}>
            {/* Card Header */}
            <CardHeader
                title={<Typography fontSize={16} fontWeight={600}>Attendance Overview</Typography>}
                action={
                    <>
                        <IconButton
                            onClick={handleClick}
                            sx={{
                                border: theme.palette.mode === "light" ? '1px solid #E5E7EB !important' : "1px solid #ffffff36 !important",
                                padding: "6px 12px",
                                borderRadius: "4px",
                                fontSize: "14px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <CalendarBlankOutline sx={{ fontSize: 18, marginRight: 1 }} />
                            {selectedPeriod}
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => handleClose()}
                        >
                            {["This Month", "This Week", "Last Week"].map((period) => (
                                <MenuItem
                                    key={period}
                                    onClick={() => handleClose(period)}
                                    sx={{ borderRadius: "4px" }}
                                >
                                    {period}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                }
                sx={{
                    pb: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
            />
            <Divider />

            {/* Card Content */}
            <CardContent>
                {/* Attendance Chart Placeholder */}
                <Box sx={{ position: "relative", textAlign: "center", mb: 3 }}>
                    <AttendanceChart />
                    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                        <Typography variant="body2">Total Attendance</Typography>
                        <Typography variant="h5">120</Typography>
                    </Box>
                </Box>

                {/* Status */}
                <Typography variant="subtitle1" fontSize={14} fontWeight={600} mb={2} mt={2}>
                    Status
                </Typography>
                {[
                    { label: "Present", color: "#03C95A", value: "59%" },
                    { label: "Late", color: "#3B7080", value: "21%" },
                    { label: "Permission", color: "#FFC107", value: "2%" },
                    { label: "Absent", color: "#E70D0D", value: "15%" },
                ].map((item, index) => (
                    <Box key={index} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2">
                            <span style={{ color: item.color, marginRight: 5 }}>●</span> {item.label}
                        </Typography>
                        <Typography variant="body2" fontSize={13} fontWeight={700} color={'#000'}>
                            {item.value}
                        </Typography>
                    </Box>
                ))}

                {/* Absent Employees */}
                <Box sx={{ backgroundColor: "background.default", p: 2, borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ mr: 2 }}>
                            Total Absentees
                        </Typography>
                        <AvatarGroup max={5} spacing="small">
                            {["images/avatars/avatar-2.png", "images/avatars/avatar-3.png", "images/avatars/avatar-7.png", "images/avatars/avatar-10.png"].map((src, index) => (
                                <StyledAvatar key={index} src={src} />
                            ))}
                            <StyledAvatar sx={{ bgcolor: "primary.main", color: "white", fontSize: "10px" }}>+1</StyledAvatar>
                        </AvatarGroup>
                    </Box>
                    <Typography variant="body2" color="primary" sx={{ textDecoration: "underline", cursor: "pointer" }}>
                        View Details
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AttendanceOverview;
