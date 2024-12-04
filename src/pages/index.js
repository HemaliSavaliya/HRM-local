import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles'
import { Grid, Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { AccountGroup, NewspaperCheck, NoteSearchOutline, Projector } from 'mdi-material-ui';

const StyledBoxForSVG = styled(Box)({
  width: "30%",
  height: "100px",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.5s',
  background: ' rgb(115 102 255 / 20%)',
  color: '#7366FF'
})

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
    eventStatus: {
      todaysEvents: 0,
      upcomingEvents: 0,
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

      // Get events from localStorage
      const events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
      const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

      const eventStatus = {
        todaysEvents: events.filter((event) => {
          const eventStart = new Date(event.start);
          const eventEnd = event.end ? new Date(event.end) : eventStart;
          return eventStart <= endOfDay && eventEnd >= startOfDay;
        }).length,
        upcomingEvents: events.filter((event) => {
          const eventStart = new Date(event.start);
          return eventStart > endOfDay;
        }).length,
      };

      // Update state with the calculated data
      setDashboardData({
        totalEmployees,
        totalProjects,
        upcomingHolidays,
        totalLeaves,
        leaveStatus,
        projectStatus,
        eventStatus
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
            <CardContent sx={{ display: "flex", justifyContent: "start", alignItems: "center", padding: 0, paddingBottom: '0px !important' }}>
              <StyledBoxForSVG>
                <AccountGroup sx={{ fontSize: "35px" }} />
              </StyledBoxForSVG>
              <Box padding={3}>
                <Typography variant="h5">{dashboardData.totalEmployees}</Typography>
                <Typography variant="subtitle2">Total Employees</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Number of Leaves */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: "flex", justifyContent: "start", alignItems: "center", padding: 0, paddingBottom: '0px !important' }}>
              <StyledBoxForSVG>
                <NoteSearchOutline sx={{ fontSize: "35px" }} />
              </StyledBoxForSVG>
              <Box padding={3}>
                <Typography variant="h5">{dashboardData.totalLeaves}</Typography>
                <Typography variant="subtitle2">Number of Leaves</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Projects */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: "flex", justifyContent: "start", alignItems: "center", padding: 0, paddingBottom: '0px !important' }}>
              <StyledBoxForSVG>
                <Projector sx={{ fontSize: "35px" }} />
              </StyledBoxForSVG>
              <Box padding={3}>
                <Typography variant="h5">{dashboardData.totalProjects}</Typography>
                <Typography variant="subtitle2">Total Projects</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Holidays */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: "flex", justifyContent: "start", alignItems: "center", padding: 0, paddingBottom: '0px !important' }}>
              <StyledBoxForSVG>
                <NewspaperCheck sx={{ fontSize: "35px" }} />
              </StyledBoxForSVG>
              <Box padding={3}>
                <Typography variant="h5">{dashboardData.upcomingHolidays}</Typography>
                <Typography variant="subtitle2">Upcoming Holidays</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave status */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ height: "200px" }}>
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
            <CardContent sx={{ height: "200px" }}>
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
            <CardContent sx={{ height: "200px" }}>
              <Typography variant="h6" mb={4}>Event Status</Typography>
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1">Today's Events</Typography>
                <Typography variant="subtitle2">{dashboardData.eventStatus.todaysEvents}</Typography>
              </Box>
              <Divider />
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body1">Upcoming Events</Typography>
                <Typography variant="subtitle2">{dashboardData.eventStatus.upcomingEvents}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
