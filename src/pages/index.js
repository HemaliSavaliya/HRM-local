import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Divider } from '@mui/material';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 0,
    totalProjects: 0,
    upcomingHolidays: 0,
    totalLeaves: 0,
    leaveStatus: {
      pending: 0,
      approved: 0,
      rejected: 0,
    },
    projectStatus: {
      completed: 0,
      inprogress: 0,
      upcoming: 0,
    },
  });

  useEffect(() => {
    // Fetch data from localStorage and calculate metrics
    const fetchData = () => {
      // Get employees from localStorage
      const employees = JSON.parse(localStorage.getItem('employee')) || [];
      const totalEmployees = employees.length;

      // Get projects from localStorage
      const projects = JSON.parse(localStorage.getItem('project')) || [];
      const totalProjects = projects.length;

      // Calculate project status counts
      const projectStatus = {
        completed: projects.filter((project) => project.status.toLowerCase() === 'completed').length,
        inprogress: projects.filter((project) => project.status.toLowerCase() === 'inprogress').length,
        upcoming: projects.filter((project) => project.status.toLowerCase() === 'upcoming').length,
      };

      // Get holidays from localStorage
      const holidays = JSON.parse(localStorage.getItem('holiday')) || [];
      const currentDate = new Date();
      const upcomingHolidays = holidays.filter(holiday => {
        const holidayDate = new Date(holiday.date);
        return holidayDate >= currentDate; // Filter holidays on or after the current date
      }).length;

      // Get leave requests from localStorage
      const leaveRequests = JSON.parse(localStorage.getItem('leaveRequest')) || [];
      const totalLeaves = leaveRequests.length;

      // Calculate leave status counts
      const leaveStatus = {
        pending: leaveRequests.filter((leave) => leave.status.toLowerCase() === 'pending').length,
        approved: leaveRequests.filter((leave) => leave.status.toLowerCase() === 'approved').length,
        rejected: leaveRequests.filter((leave) => leave.status.toLowerCase() === 'rejected').length,
      };

      // Update state with the calculated data
      setDashboardData({
        totalEmployees,
        totalProjects,
        upcomingHolidays,
        totalLeaves,
        leaveStatus,
        projectStatus
      });
    };

    fetchData();
  }, []); // Runs once on component mount

  return (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={3}>
        {/* Total Employees */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">{dashboardData.totalEmployees}</Typography>
              <Typography variant="subtitle2">Total Employees</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Number of Leaves */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">{dashboardData.totalLeaves}</Typography>
              <Typography variant="subtitle2">Number of Leaves</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Projects */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">{dashboardData.totalProjects}</Typography>
              <Typography variant="subtitle2">Total Projects</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Holidays */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">{dashboardData.upcomingHolidays}</Typography>
              <Typography variant="subtitle2">Upcoming Holidays</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave status */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={4}>Leave Requests</Typography>
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1">Pending Leave</Typography>
                <Typography variant="subtitle2">{dashboardData.leaveStatus.pending}</Typography>
              </Box>
              <Divider />
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1">Approved Leave</Typography>
                <Typography variant="subtitle2">{dashboardData.leaveStatus.approved}</Typography>
              </Box>
              <Divider />
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1">Reject Leave</Typography>
                <Typography variant="subtitle2">{dashboardData.leaveStatus.rejected}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Project status */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={4}>Project Status</Typography>
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1">Completed</Typography>
                <Typography variant="subtitle2">{dashboardData.projectStatus.completed}</Typography>
              </Box>
              <Divider />
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1">In Progress</Typography>
                <Typography variant="subtitle2">{dashboardData.projectStatus.inprogress}</Typography>
              </Box>
              <Divider />
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1">Upcoming</Typography>
                <Typography variant="subtitle2">{dashboardData.projectStatus.upcoming}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Event Status */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={4}>Event Status</Typography>
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1">Today's Events</Typography>
                <Typography variant="subtitle2">210</Typography>
              </Box>
              <Divider />
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1">Upcoming Events</Typography>
                <Typography variant="subtitle2">20</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
