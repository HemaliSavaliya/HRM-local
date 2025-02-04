import React, { useState } from "react";
import { Card, CardHeader, CardContent, Typography, Avatar, Menu, MenuItem, Button, IconButton, Divider, useTheme, Box } from "@mui/material";
import { CalendarBlankOutline, ClockOutline } from "mdi-material-ui";

const employees = [
  { name: "Daniel Esbella", role: "UI/UX Designer", avatar: "images/avatars/avatar-2.png", time: "09:15" },
  { name: "Doglas Martini", role: "Project Manager", avatar: "images/avatars/avatar-3.png", time: "09:36" },
  { name: "Brian Villalobos", role: "PHP Developer", avatar: "images/avatars/avatar-7.png", time: "09:15", clockIn: "10:30 AM", clockOut: "09:45 AM", production: "09:21 Hrs" }
];

const lateEmployees = [
  { name: "Anthony Lewis", role: "Marketing Head", avatar: "images/avatars/avatar-10.png", time: "08:35", lateBy: "30 Min" }
];

const ClockInOutCard = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (filter) => {
    if (filter) setSelectedFilter(filter);
    setAnchorEl(null);
  };

  return (
    <Card sx={{ height: "481px" }}>
      <CardHeader
        title={<Typography fontSize={16} fontWeight={600}>Clock-In/Out</Typography>}
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
        sx={{
          pb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      />
      <Divider />
      <CardContent sx={{ paddingTop: 2 }}>
        {employees.map((employee, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", border: "1px dashed #ddd", mb: 2, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={employee.avatar} />
              <Box sx={{ marginLeft: "10px" }}>
                <Typography variant="body1"
                  sx={{
                    whiteSpace: 'normal',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >{employee.name}</Typography>
                <Typography variant="body2" color="textSecondary" fontSize={13}>{employee.role}</Typography>
              </Box>
            </Box>
            <Box sx={{
              background: '#03C95A',
              color: '#fff',
              padding: '0.25rem 0.45rem',
              fontWeight: 600,
              letterSpacing: '0.5px',
              borderRadius: '4px',
              fontSize: '10px',
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: 75
            }}>
              <ClockOutline sx={{ width: 15, height: 15 }} />
              <Typography variant="body2" color="#fff">{employee.time}</Typography>
            </Box>
          </Box>
        ))}
        <Typography fontSize={14} fontWeight={600} mb={1}>Late</Typography>
        {lateEmployees.map((employee, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", border: "1px dashed #ddd", mb: 2, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={employee.avatar} />
              <Box sx={{ marginLeft: "10px" }}>
                <Typography variant="body1"
                  sx={{
                    whiteSpace: 'normal',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  {employee.name}
                  <span style={{
                    marginLeft: "10px",
                    background: '#E70D0D',
                    color: '#fff',
                    padding: '0.25rem 0.45rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    width: 53,
                    display: "inline-flex"
                  }}>{employee.lateBy}</span>
                </Typography>
                <Typography variant="body2" color="textSecondary" fontSize={13}>{employee.role}</Typography>
              </Box>
            </Box>
            <Box sx={{
              background: '#E70D0D',
              color: '#fff',
              padding: '0.25rem 0.45rem',
              fontWeight: 600,
              letterSpacing: '0.5px',
              borderRadius: '4px',
              fontSize: '10px',
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: 75
            }}>
              <ClockOutline sx={{ width: 15, height: 15 }} />
              <Typography variant="body2" color="#fff">{employee.time}</Typography>
            </Box>
          </Box>
        ))}
        <Button variant="outlined" fullWidth sx={{
          backgroundColor: theme.palette.mode === "light" ? '#F8F9FA' : "#f8f9fa14",
          border: theme.palette.mode === "light" ? '1px solid #cbcbcb' : "1px solid #cbcbcb1f",
          color: theme.palette.mode === "light" ? '#111827' : "#e1e3e7",
          textTransform: 'capitalize',
          mt: 5,
          "&:hover": {
            backgroundColor: 'rgba(115, 102, 255, 0%)',
            border: '1px solid #7366ff63',
            color: "primary.main"
          }
        }}>
          View All Attendance
        </Button>
      </CardContent>
    </Card >
  );
};

export default ClockInOutCard;
