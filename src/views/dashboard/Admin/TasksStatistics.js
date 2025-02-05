import React, { useState } from "react";
import { Card, CardHeader, CardContent, Typography, Avatar, Menu, MenuItem, Button, IconButton, Divider, useTheme, Box, TableContainer, Table, TableBody, TableRow, TableCell, Badge } from "@mui/material";
import { CalendarBlankOutline } from "mdi-material-ui";
import PerfectScrollbar from "react-perfect-scrollbar";

const TasksStatistics = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("Today");

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = (filter) => {
        if (filter) setSelectedFilter(filter);
        setAnchorEl(null);
    };

    return (
        <Card sx={{ height: "481px", display: "flex", flexDirection: "column" }}>
            {/* Header (Fixed, Not Scrolling) */}
            <CardHeader
                title={<Typography fontSize={16} fontWeight={600}>Tasks Statistics</Typography>}
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
                            {selectedFilter}
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => handleClose()}
                        >
                            {["This Month", "This Week", "Today"].map((period) => (
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
            />
            <Divider sx={{ margin: 0 }} />

            {/* Scrollable Content */}
            <Box sx={{ flex: 1, overflow: "hidden" }}>
                <PerfectScrollbar style={{ maxHeight: "100%" }}>
                    <CardContent sx={{ padding: 0 }}>

                    </CardContent>
                </PerfectScrollbar>
            </Box>
        </Card>
    );
};

export default TasksStatistics;
