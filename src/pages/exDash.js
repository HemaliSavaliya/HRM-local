import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles'
import { Grid, Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { AccountGroup, BullhornOutline, NewspaperCheck, NoteSearchOutline, Projector, Seal } from 'mdi-material-ui';
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import {
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, ArcElement, BarElement, Title, Tooltip, Legend);

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
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const role = authToken?.role

  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 0,
    totalProjects: 0,
    upcomingHolidays: 0,
    totalLeaves: 0,
    totalAnnouncement: 0,
    totalAwards: 0,
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
      const totalEmployees = employees.length || 100;

      // Get announcement from localStorage
      const announcement = JSON.parse(localStorage.getItem('announcement')) || [];
      const totalAnnouncement = announcement.length || 1;

      // Get award from localStorage
      const awards = JSON.parse(localStorage.getItem('award')) || [];
      const userAwards = awards.filter((award) => award.employeeId === authToken?.id);
      const totalAwards = userAwards.length || 80;

      // Get projects from localStorage
      const projects = JSON.parse(localStorage.getItem('project')) || [];
      
      const filteredProject = role === 'admin'
        ? projects // Admin sees all projects
        : authToken?.id === ''
          ? projects // Employee with no ID sees all projects
          : projects.filter(
            (project) =>
              project.userId.includes(authToken?.id) // Employee sees only their projects
          );
      const totalProjects = projects.length || 55;

      // Calculate project status counts
      const projectStatus = {
        completed: filteredProject.filter((project) => project.status.toLowerCase() === 'completed').length || 40,
        inprogress: filteredProject.filter((project) => project.status.toLowerCase() === 'inprogress').length || 10,
        upcoming: filteredProject.filter((project) => project.status.toLowerCase() === 'upcoming').length || 5,
      };

      // Get holidays from localStorage
      const holidays = JSON.parse(localStorage.getItem('holiday')) || [];
      const currentDate = new Date();

      const upcomingHolidays = holidays.filter(holiday => {

        const holidayDate = new Date(holiday.date);

        return holidayDate >= currentDate; // Filter holidays on or after the current date
      }).length || 5;

      // Get leave requests from localStorage
      const leaveRequests = JSON.parse(localStorage.getItem('leaveRequest')) || [];

      const filteredLeaveRequests =
        role === 'hr'
          ? leaveRequests.filter((leave) => leave.role === 'employee') // Only employee roles for HR
          : leaveRequests; // All leave requests for other roles like Admin
      const totalLeaves = filteredLeaveRequests.length || 3;

      // Filter leave requests for HR role
      const filterLeave = role === 'hr'
        ? leaveRequests.filter((leave) => leave.role.toLowerCase() === 'hr')
        : role === 'employee'
          ? leaveRequests.filter((leave) => leave.role.toLowerCase() === 'employee')
          : leaveRequests;

      // Calculate leave status counts
      const leaveStatus = {
        pending: filterLeave.filter((leave) => leave.status.toLowerCase() === 'pending').length || 10,
        approved: filterLeave.filter((leave) => leave.status.toLowerCase() === 'approved').length || 40,
        rejected: filterLeave.filter((leave) => leave.status.toLowerCase() === 'rejected').length || 10,
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
        }).length || 1,
        upcomingEvents: events.filter((event) => {
          const eventStart = new Date(event.start);

          return eventStart > endOfDay;
        }).length || 5,
      };

      // Update state with the calculated data
      setDashboardData({
        totalEmployees,
        totalProjects,
        totalAnnouncement,
        totalAwards,
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
      {role === 'admin' && (
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
          <Grid item xs={12} sm={12} md={4}>
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

          {/* Leave chart */}
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={4}>Leave Chart</Typography>
                <Bar
                  data={{
                    labels: ['Pending', 'Approved', 'Rejected'],
                    datasets: [{
                      label: 'Leave Requests',
                      data: [
                        dashboardData.leaveStatus.pending,
                        dashboardData.leaveStatus.approved,
                        dashboardData.leaveStatus.rejected,
                      ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                      ],
                      borderWidth: 1,
                    }],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Leave Requests',
                      },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Project charts */}
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={4}>Project Chart</Typography>
                <Line
                  data={{
                    labels: ['Completed', 'In Progress', 'Upcoming'],
                    datasets: [{
                      label: 'Project Status',
                      data: [dashboardData.projectStatus.completed, dashboardData.projectStatus.inprogress, dashboardData.projectStatus.upcoming],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                      ],
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    title: {
                      display: true,
                      text: 'Project Status'
                    },
                    scales: {
                      yAxes: [{
                        ticks: {
                          beginAtZero: true
                        }
                      }]
                    }
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Events chart */}
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <CardContent sx={{ height: "400px" }}>
                <Typography variant="h6" mb={4}>Event Chart</Typography>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <div style={{ height: '320px', width: '320px' }}>
                    <PolarArea
                      data={{
                        labels: ["Today's Events", "Upcoming Events"],
                        datasets: [
                          {
                            label: 'Event Status',
                            data: [
                              dashboardData.eventStatus.todaysEvents,
                              dashboardData.eventStatus.upcomingEvents,
                            ],
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                            ],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false, // Allows custom height and width
                        plugins: {
                          title: {
                            display: true,
                            text: 'Event Status',
                          },
                        },
                      }}
                    />
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {role === "hr" && (
        <Grid container spacing={3}>
          {/* Total Employees */}
          <Grid item xs={12} sm={4} md={4}>
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
          <Grid item xs={12} sm={4} md={4}>
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

          {/* Upcoming Holidays */}
          <Grid item xs={12} sm={4} md={4}>
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
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent sx={{ height: "200px" }}>
                <Typography variant="h6" mb={4}>Leave Requests</Typography>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Typography variant="body1">Total Pending Leave</Typography>
                  <Typography variant="subtitle2">{dashboardData.leaveStatus.pending}</Typography>
                </Box>
                <Divider />
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Typography variant="body1">Total Approved Leave</Typography>
                  <Typography variant="subtitle2">{dashboardData.leaveStatus.approved}</Typography>
                </Box>
                <Divider />
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Typography variant="body1">Total Reject Leave</Typography>
                  <Typography variant="subtitle2">{dashboardData.leaveStatus.rejected}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Event Status */}
          <Grid item xs={12} sm={6} md={6}>
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

          {/* Leave chart */}
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={4}>Leave Chart</Typography>
                <Bar
                  data={{
                    labels: ['Pending', 'Approved', 'Rejected'],
                    datasets: [{
                      label: 'Leave Requests',
                      data: [
                        dashboardData.leaveStatus.pending,
                        dashboardData.leaveStatus.approved,
                        dashboardData.leaveStatus.rejected,
                      ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                      ],
                      borderWidth: 1,
                    }],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Leave Requests',
                      },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Event chart */}
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardContent sx={{ height: "400px" }}>
                <Typography variant="h6" mb={4}>Event Chart</Typography>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <div style={{ height: '320px', width: '320px' }}>
                    <PolarArea
                      data={{
                        labels: ["Today's Events", "Upcoming Events"],
                        datasets: [
                          {
                            label: 'Event Status',
                            data: [
                              dashboardData.eventStatus.todaysEvents,
                              dashboardData.eventStatus.upcomingEvents,
                            ],
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                            ],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false, // Allows custom height and width
                        plugins: {
                          title: {
                            display: true,
                            text: 'Event Status',
                          },
                        },
                      }}
                    />
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {role === "employee" && (
        <Grid container spacing={3}>
          {/* Upcoming Holidays */}
          <Grid item xs={12} sm={4} md={4}>
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

          {/* announcement */}
          <Grid item xs={12} sm={4} md={4}>
            <Card>
              <CardContent sx={{ display: "flex", justifyContent: "start", alignItems: "center", padding: 0, paddingBottom: '0px !important' }}>
                <StyledBoxForSVG>
                  <BullhornOutline sx={{ fontSize: "35px" }} />
                </StyledBoxForSVG>
                <Box padding={3}>
                  <Typography variant="h5">{dashboardData.totalAnnouncement}</Typography>
                  <Typography variant="subtitle2">Announcement</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Awards */}
          <Grid item xs={12} sm={4} md={4}>
            <Card>
              <CardContent sx={{ display: "flex", justifyContent: "start", alignItems: "center", padding: 0, paddingBottom: '0px !important' }}>
                <StyledBoxForSVG>
                  <Seal sx={{ fontSize: "35px" }} />
                </StyledBoxForSVG>
                <Box padding={3}>
                  <Typography variant="h5">{dashboardData.totalAwards}</Typography>
                  <Typography variant="subtitle2">Awards</Typography>
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
                  <Typography variant="body1">Total Pending Leave</Typography>
                  <Typography variant="subtitle2">{dashboardData.leaveStatus.pending}</Typography>
                </Box>
                <Divider />
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Typography variant="body1">Total Approved Leave</Typography>
                  <Typography variant="subtitle2">{dashboardData.leaveStatus.approved}</Typography>
                </Box>
                <Divider />
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Typography variant="body1">Total Reject Leave</Typography>
                  <Typography variant="subtitle2">{dashboardData.leaveStatus.rejected}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Project status */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent sx={{ height: "200px" }}>
                <Typography variant="h6" mb={4}>Projects</Typography>
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

          {/* Leave chart */}
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={4}>Leave Chart</Typography>
                <Bar
                  data={{
                    labels: ['Pending', 'Approved', 'Rejected'],
                    datasets: [{
                      label: 'Leave Requests',
                      data: [
                        dashboardData.leaveStatus.pending,
                        dashboardData.leaveStatus.approved,
                        dashboardData.leaveStatus.rejected,
                      ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                      ],
                      borderWidth: 1,
                    }],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Leave Requests',
                      },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Project charts */}
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={4}>Project Chart</Typography>
                <Line
                  data={{
                    labels: ['Completed', 'In Progress', 'Upcoming'],
                    datasets: [{
                      label: 'Project Status',
                      data: [dashboardData.projectStatus.completed, dashboardData.projectStatus.inprogress, dashboardData.projectStatus.upcoming],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                      ],
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    title: {
                      display: true,
                      text: 'Project Status'
                    },
                    scales: {
                      yAxes: [{
                        ticks: {
                          beginAtZero: true
                        }
                      }]
                    }
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Events chart */}
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <CardContent sx={{ height: "400px" }}>
                <Typography variant="h6" mb={4}>Event Chart</Typography>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <div style={{ height: '320px', width: '320px' }}>
                    <PolarArea
                      data={{
                        labels: ["Today's Events", "Upcoming Events"],
                        datasets: [
                          {
                            label: 'Event Status',
                            data: [
                              dashboardData.eventStatus.todaysEvents,
                              dashboardData.eventStatus.upcomingEvents,
                            ],
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                            ],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false, // Allows custom height and width
                        plugins: {
                          title: {
                            display: true,
                            text: 'Event Status',
                          },
                        },
                      }}
                    />
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box >
  );
};

export default Dashboard;
