import { Avatar, Box, Button, Card, Checkbox, Chip, Divider, Grid, IconButton, Link, List, ListItem, Menu, MenuItem, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material'
import { ArrowBottomLeft, ArrowTopRight, CalendarBlankOutline, ChevronRight, ClockOutline, DotsVertical, PencilOutline, TrashCanOutline, TrayArrowDown } from 'mdi-material-ui'
import { styled } from '@mui/material/styles'
import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import dynamic from 'next/dynamic';
const EmployeeChart = dynamic(() => import('./charts/EmployeeChart'), { ssr: false });
const TotalApplicationChart = dynamic(() => import('./charts/ApplicationChart'), { ssr: false });
const HiredCandidatesChart = dynamic(() => import('./charts/HiredCandidates'), { ssr: false });
const RejectedCandidatesChart = dynamic(() => import('./charts/RejectedCandidates'), { ssr: false });
const ApplicationReceivedChart = dynamic(() => import('./charts/ApplicationReceivedChart'), { ssr: false });
const TotalProjectChart = dynamic(() => import('./charts/TotalProjectChart'), { ssr: false });

const MainButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 0,
    fontSize: '0.75rem', // Equivalent to text-xs
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.chart : theme.palette.primary.chartDark,
    cursor: "pointer",
    color: 'rgb(14, 165, 233)',
    width: '2rem',
    height: '2rem', // Equivalent to size-8
    borderRadius: '.375rem',
    '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.primary.hover,
        borderColor: theme.palette.primary.hover,
    },
    '&:focus': {
        color: 'white',
        backgroundColor: theme.palette.primary.hover,
        borderColor: theme.palette.primary.hover,
        boxShadow: '0 0 0 4px rgba(100, 181, 246, 0.25)', // Equivalent to focus:ring
    },
    '&:active': {
        color: 'white',
        backgroundColor: theme.palette.primary.hover,
        borderColor: theme.palette.primary.hover,
        boxShadow: '0 0 0 4px rgba(100, 181, 246, 0.25)', // Equivalent to active:ring
    },
    '&.Mui-focusVisible': {
        boxShadow: '0 0 0 4px rgba(100, 181, 246, 0.25)', // Fallback for focus-visible
    },
}))

const CustomStyledCheckbox = styled(Checkbox)(({ theme }) => ({
    '&.MuiCheckbox-root': {
        color: 'rgb(226, 232, 240)', // Change the color here
        '&.Mui-checked': {
            color: '#7366FF', // Change the checked color here
        },
    },
}));

const EventItem = ({ day, month, title, time, creator }) => (
    <Grid container spacing={2} alignItems="center">
        <Grid item>
            <Paper sx={{ width: '3rem', height: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: 1, borderColor: 'rgb(226 232 240 / 1)', borderRadius: .125, boxShadow: 'none' }}>
                <Typography variant="subtitle1">{day}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{month}</Typography>
            </Paper>
        </Grid>
        <Grid item xs>
            <Typography variant="body1" fontSize={'14px'} fontWeight={600}> {title}
                {time &&
                    <Typography component="span" sx={{ display: 'inline-block', marginLeft: 1, padding: '2px 8px', fontSize: 11, borderRadius: 1, bgcolor: 'background.default', color: 'text.secondary' }}>
                        {time}
                    </Typography>
                }
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>{creator}
            </Typography>
        </Grid>
    </Grid>
);

const HRDashboard = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElInter, setAnchorElInter] = useState(null);
    const [anchorElRecent, setAnchorElRecent] = useState(null);
    const open = Boolean(anchorEl);
    const openInter = Boolean(anchorElInter);
    const openRecent = Boolean(anchorElRecent);
    const [date, setDate] = useState(new Date());

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = (event) => {
        setAnchorElInter(event.currentTarget);
    };

    const handleMenuCloseInter = () => {
        setAnchorElInter(null);
    };

    const handleMenuRecent = (event) => {
        setAnchorElRecent(event.currentTarget);
    };

    const handleMenuCloseRecent = () => {
        setAnchorElRecent(null);
    };

    const employees = [
        {
            id: 'TW-1001',
            img: 'images/avatars/avatar-2.png',
            name: 'Kristen Redden',
            email: 'kredden@tailwick.com',
            designation: 'Designer',
            performance: 'Good',
            status: 'Active',
        },
        {
            id: 'TW-1002',
            img: 'images/avatars/avatar-3.png',
            name: 'Howard George',
            email: 'george@tailwick.com',
            designation: 'ASP.Net Developer',
            performance: 'Low',
            status: 'Disabled',
        },
        {
            id: 'TW-1001',
            img: 'images/avatars/avatar-7.png',
            name: 'Kristen Redden',
            email: 'kredden@tailwick.com',
            designation: 'Designer',
            performance: 'Good',
            status: 'Active',
        },
        {
            id: 'TW-1002',
            img: 'images/avatars/avatar-10.png',
            name: 'Howard George',
            email: 'george@tailwick.com',
            designation: 'ASP.Net Developer',
            performance: 'Low',
            status: 'Active',
        },
    ];

    const interviews = [
        {
            id: 1,
            name: "James Krogman",
            email: "james@tailwick.com",
            date: "25 Nov",
            time: "02:41 PM",
            status: "Confirm",
            avatar: "/images/avatars/avatar-2.png",
            statusColor: "success.main",
        },
        {
            id: 2,
            name: "Michael Scott",
            email: "michael@tailwick.com",
            date: "05 Dec",
            time: "01:23 PM",
            status: "Re-scheduled",
            avatar: "/images/avatars/avatar-3.png",
            statusColor: "warning.main",
        },
        {
            id: 3,
            name: "Denise Ledford",
            email: "ledford@tailwick.com",
            date: "27 Nov",
            time: "11:59 PM",
            status: "Scheduled",
            avatar: "/images/avatars/avatar-7.png",
            statusColor: "info.main",
        },
        {
            id: 4,
            name: "Gladys Smith",
            email: "gap-4@tailwick.com",
            date: "07 Dec",
            time: "05:19 PM",
            status: "Cancelled",
            avatar: "/images/avatars/avatar-10.png",
            statusColor: "error.main",
        },
    ];

    const payrollData = [
        { name: "Christopher Horn", amount: "$145.32", status: "Cancelled", color: "success" },
        { name: "Richard Peters", amount: "$4512.99", status: "Pending", color: "warning" },
        { name: "James Perez", amount: "$879.99", status: "Paid", color: "success" },
        { name: "Myrtle Velez", amount: "$978.14", status: "Cancelled", color: "error" },
        { name: "Brad Castillo", amount: "$412.59", status: "Pending", color: "warning" },
        { name: "Christopher Horn", amount: "$145.32", status: "Cancelled", color: "success" },
        { name: "Richard Peters", amount: "$4512.99", status: "Pending", color: "warning" },
        { name: "James Perez", amount: "$879.99", status: "Paid", color: "success" },
        { name: "Myrtle Velez", amount: "$978.14", status: "Cancelled", color: "error" },
        { name: "Brad Castillo", amount: "$412.59", status: "Pending", color: "warning" },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Box>
                    <Typography variant="h5">HR</Typography>
                </Box>
                <List sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '1rem', fontWeight: 'normal', padding: 0 }}>
                    <ListItem sx={{ padding: 0 }}>
                        <Link href="/" sx={{ color: 'text.secondary', fontSize: 14 }}>Dashboards</Link>
                    </ListItem>
                    <ChevronRight sx={{ fontSize: 14 }} />
                    <ListItem sx={{ color: 'text.primary', padding: 0, fontSize: 14 }}>HR</ListItem>
                </List>
            </Box>

            <Grid container spacing={3} mt={3}>
                <Grid item xs={12} sm={12} md={8}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Welcome Paula Keenan 🎉</Typography> <Typography variant='body2' sx={{ mb: 5, color: 'text.secondary' }}>
                        The salary of
                        <Link href="#!" underline="hover" sx={{ color: 'text.primary' }}> Glennie Langosh
                        </Link> is pending since 05 Dec, 2023. The documentation of the tasks, workflows, and activities that make up a process managed by the HR or People Ops team.
                        <Link href="#!" sx={{ color: 'red' }}> Learn More </Link>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Card sx={{ padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid container spacing={2} textAlign={'center'}>
                            <Grid item xs={4} sm={4} md={4}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    36
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Absent</Typography>
                            </Grid>
                            <Divider />
                            <Grid item xs={4} sm={4} md={4}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    465
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Attendance</Typography>
                            </Grid>
                            <Divider />
                            <Grid item xs={4} sm={4} md={4}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    50
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Late</Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={5} mt={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <Card sx={{ p: 5 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={7} sm={7} md={9}>
                                <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                                    Total Employee
                                </Typography>
                                <Typography variant="h5" sx={{ mt: 3, mb: 4 }}>
                                    615
                                </Typography>
                            </Grid>
                            <Grid item xs={5} sm={5} md={3}>
                                <EmployeeChart />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 3 }}>
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary', flexGrow: 1 }}>
                                <span style={{ fontWeight: 'medium', color: 'green' }}>15%</span> Increase
                            </Typography>
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>This Month</Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card sx={{ p: 5 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={7} sm={7} md={9}>
                                <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                                    Total Application
                                </Typography>
                                <Typography variant="h5" sx={{ mt: 3, mb: 4 }}>
                                    174
                                </Typography>
                            </Grid>
                            <Grid item xs={5} sm={5} md={3}>
                                <TotalApplicationChart />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 3 }}>
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary', flexGrow: 1 }}>
                                <span style={{ fontWeight: 'medium', color: 'green' }}>26%</span> Increase
                            </Typography>
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>This Month</Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card sx={{ p: 5 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={7} sm={7} md={9}>
                                <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                                    Hired Candidates
                                </Typography>
                                <Typography variant="h5" sx={{ mt: 3, mb: 4 }}>
                                    64
                                </Typography>
                            </Grid>
                            <Grid item xs={5} sm={5} md={3}>
                                <HiredCandidatesChart />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 3 }}>
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary', flexGrow: 1 }}>
                                <span style={{ fontWeight: 'medium', color: 'red' }}>05%</span> Increase
                            </Typography>
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>This Month</Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card sx={{ p: 5 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={7} sm={7} md={9}>
                                <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                                    Rejected Candidates
                                </Typography>
                                <Typography variant="h5" sx={{ mt: 3, mb: 4 }}>
                                    110
                                </Typography>
                            </Grid>
                            <Grid item xs={5} sm={5} md={3}>
                                <RejectedCandidatesChart />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 3 }}>
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary', flexGrow: 1 }}>
                                <span style={{ fontWeight: 'medium', color: 'red' }}>16%</span> Increase
                            </Typography>
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>This Month</Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            <Card sx={{ p: 5, mt: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', gap: 2, mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 0 }}>Application Received</Typography>
                    <Box display={'flex'} gap={'10px'}>
                        <MainButton sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>All</MainButton>
                        <MainButton>1M</MainButton>
                        <MainButton>6M</MainButton>
                        <MainButton>1Y</MainButton>
                    </Box>
                </Box>
                <ApplicationReceivedChart />
            </Card>

            <Card sx={{ p: 5, mt: 5 }}>
                <Box sx={{ padding: 2 }}>
                    <Grid container spacing={2} mb={'20px'}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6">Employee Performance</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        placeholder="Search for ..."
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="outlined" color="primary" sx={{ borderStyle: "dashed", textTransform: "capitalize", gap: '2px' }}>
                                        <TrayArrowDown sx={{ width: "20px" }} />  Export
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <TableContainer sx={{ borderTop: "1px solid rgba(58, 53, 65, 0.12)" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <CustomStyledCheckbox />
                                    </TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Designation</TableCell>
                                    <TableCell>Performance</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell padding="checkbox">
                                            <CustomStyledCheckbox />
                                        </TableCell>
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>
                                            <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                                                <Box>
                                                    <Avatar width={'2.5rem'} height={'2.5rem'} src={employee.img} alt={employee.name} sx={{
                                                        borderRadius: '9999px',
                                                        background: 'rgb(224, 242, 254)'
                                                    }}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" fontSize={'14px'} fontWeight={600}>{employee.name}</Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {employee.email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{employee.designation}</TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: employee.performance === 'Good' ? 'green' : 'red',
                                                }}
                                            >
                                                {employee.performance}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    color: employee.status === 'Active' ? 'rgb(36, 151, 130)' : 'rgb(100, 116, 139)',
                                                    fontWeight: 500,
                                                    fontSize: '.75rem',
                                                    paddingTop: '.125rem',
                                                    paddingBottom: '.125rem',
                                                    paddingLeft: '.625rem',
                                                    paddingRight: '.625rem',
                                                    background: employee.status === 'Active' ? 'rgb(210, 244, 238)' : 'rgb(241, 245, 249)',
                                                    border: employee.status === 'Active' ? '1px solid rgb(160, 232, 219)' : '1px solid rgb(226, 232, 240)',
                                                    borderRadius: '.25rem',
                                                    textAlign: 'center',
                                                    width: 'fit-content'
                                                }}
                                            >
                                                {employee.status}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display={'flex'} gap={'5px'}>
                                                <Box
                                                    sx={{
                                                        color: 'rgb(100, 116, 139)',
                                                        borderRadius: '.375rem',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '2rem',
                                                        height: '2rem',
                                                        cursor: 'pointer',
                                                        transition: 'background 0.3s, color 0.3s', // Optional: smooth transition
                                                        '&:hover': {
                                                            background: 'rgb(219, 234, 254)',
                                                            color: 'rgb(59, 130, 246)',
                                                        },
                                                    }}
                                                >
                                                    <PencilOutline />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        color: 'rgb(100, 116, 139)',
                                                        borderRadius: '.375rem',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '2rem',
                                                        height: '2rem',
                                                        cursor: 'pointer',
                                                        transition: 'background 0.3s, color 0.3s', // Optional: smooth transition
                                                        '&:hover': {
                                                            background: 'rgb(254, 226, 226)',
                                                            color: 'rgb(239, 68, 68)',
                                                        },
                                                    }}
                                                >
                                                    <TrashCanOutline />
                                                </Box>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Typography variant="body2">
                            Showing <b>{employees.length}</b> of <b>19</b> Results
                        </Typography>
                        <Pagination count={3} variant="outlined" shape="rounded" />
                    </Box>
                </Box>
            </Card>

            <Grid container spacing={3} mt={3}>
                {/* Left Sidebar */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 5 }}>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600} mb={3}>Upcoming Scheduled</Typography>
                            <Box id="calendar" sx={{ width: 'auto', padding: 1 }}>
                            </Box>
                            {/* <Calendar onChange={setDate} value={date} /> */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 3 }}> {/* Event Items */}
                                <EventItem day="28" month="July" title="Meeting with Designer" time="09:57 AM" creator="Created by Admin" />
                                <EventItem day="08" month="June" title="Developing Line Managers Conference" time="10:54 AM" creator="Created by HR" />
                                <EventItem day="17" month="July" title="Airplane in Las Vegas" time="12:00 PM" creator="Created by HR" />
                                <EventItem day="11" month="Nov" title="Hospitality Project Discuses" creator="Created by Admin" />
                                <EventItem day="20" month="Nov" title="Gartner Digital Workplace" time="03:49 PM" creator="Created by HR" />
                                <EventItem day="04" month="Dec" title="Nordic People Analytics" time="11:00 AM" creator="Created by Admin" />
                                <EventItem day="17" month="Jan" title="CIPD Festival of Work" time="01:29 PM" creator="Created by HR" />
                                <EventItem day="03" month="Feb" title="HRO Today Forum" time="02:15 PM" creator="Created by Admin" />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, padding: 2, marginTop: 3, borderRadius: 1, bgcolor: '#3b82f6' }}>
                                <Avatar src="/images/support.png" alt="Support Icon" sx={{ height: 96, width: 96 }} />
                                <Box>
                                    <Typography variant="h6" sx={{ marginBottom: 1, color: 'white' }}>Need Help ?</Typography>
                                    <Typography variant="body2" sx={{ color: 'white' }}> If you would like to learn more about transferring the license to a customer </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                </Grid>

                {/* Center and Right Section */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        {/* Total Projects */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ p: 5, height: '512px' }}>
                                <Box display="flex" alignItems="baseline" gap={2} mb={3}>
                                    <Typography variant="subtitle1" fontWeight={600} mb={3} flexGrow={1}>
                                        Total Projects (247)
                                    </Typography>
                                    <Box>
                                        <IconButton
                                            aria-controls={open ? 'total-projects-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleMenuClick}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                backgroundColor: 'white',
                                                color: 'text.secondary',
                                                '&:hover': {
                                                    backgroundColor: 'grey.100',
                                                    color: 'text.secondary',
                                                },
                                            }}
                                        >
                                            <DotsVertical />
                                        </IconButton>
                                        <Menu
                                            id="total-projects-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleMenuClose}
                                            PaperProps={{
                                                style: {
                                                    minWidth: '10rem',
                                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                },
                                            }}
                                        >
                                            {['1 Weekly', '1 Monthly', '3 Monthly', '6 Monthly', 'This Yearly'].map((option) => (
                                                <MenuItem
                                                    key={option}
                                                    onClick={handleMenuClose}
                                                    sx={{
                                                        fontSize: '1rem',
                                                        color: 'text.secondary',
                                                        '&:hover': {
                                                            backgroundColor: 'grey.100',
                                                            color: 'text.primary',
                                                        },
                                                    }}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                </Box>
                                <TotalProjectChart />
                            </Card>
                        </Grid>

                        {/* Upcoming Interviews */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ p: 5, height: '512px' }}>
                                <Box display="flex" alignItems="center" gap={2} mb={3}>
                                    <Typography variant="subtitle1" fontWeight={600} mb={3} flexGrow={1}>
                                        Upcoming Interview
                                    </Typography>
                                </Box>

                                <Box px={2} height={350} overflow="auto">
                                    <Stack spacing={2}>
                                        {interviews.map((interview) => (
                                            <Box
                                                key={interview.id}
                                                border={1}
                                                borderColor="divider"
                                                borderRadius={2}
                                                p={2}
                                            >
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Avatar alt={interview.name} src={interview.avatar} />
                                                    <Box flexGrow={1}>
                                                        <Typography variant="subtitle1" gutterBottom fontWeight={600} fontSize={'14px'}>
                                                            {interview.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {interview.email}
                                                        </Typography>
                                                    </Box>
                                                    <IconButton
                                                        aria-controls={openInter ? 'interview-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={openInter ? 'true' : undefined}
                                                        onClick={handleMenuOpen}
                                                        sx={{
                                                            width: 30,
                                                            height: 30,
                                                            backgroundColor: 'white',
                                                            color: 'text.secondary',
                                                            '&:hover': {
                                                                backgroundColor: 'grey.100',
                                                                color: 'text.secondary',
                                                            },
                                                        }}
                                                    >
                                                        <DotsVertical />
                                                    </IconButton>

                                                    <Menu
                                                        id="interview-menu"
                                                        anchorEl={anchorElInter}
                                                        open={openInter}
                                                        onClose={handleMenuCloseInter}
                                                        PaperProps={{
                                                            style: {
                                                                minWidth: '10rem',
                                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)'
                                                            },
                                                        }}
                                                    >
                                                        {['Overview', 'Edit', 'Delete'].map((option) => (
                                                            <MenuItem
                                                                key={option}
                                                                onClick={handleMenuCloseInter}
                                                                sx={{
                                                                    fontSize: '1rem',
                                                                    color: 'text.secondary',
                                                                    '&:hover': {
                                                                        backgroundColor: 'grey.100',
                                                                        color: 'text.primary',
                                                                    },
                                                                }}
                                                            >
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                </Stack>
                                                <Divider sx={{ mt: 2, mb: 2 }} />
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        display="flex"
                                                        alignItems="center"
                                                        fontSize={'12px'}
                                                    >
                                                        <CalendarBlankOutline fontSize="small" sx={{ mr: 0.5 }} /> {interview.date}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        display="flex"
                                                        alignItems="center"
                                                        flexGrow={1}
                                                        fontSize={'12px'}
                                                    >
                                                        <ClockOutline fontSize="small" sx={{ mr: 0.5 }} /> {interview.time}
                                                    </Typography>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            borderColor: interview.statusColor,
                                                            color: interview.statusColor,
                                                            textTransform: 'capitalize',
                                                            fontSize: '12px',
                                                            padding: '5px 10px !important'
                                                        }}
                                                    >
                                                        {interview.status}
                                                    </Button>
                                                </Stack>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                            </Card>
                        </Grid>

                        {/* Today's Card */}
                        <Grid item xs={12}>
                            <Card sx={{
                                position: "relative",
                                background: "linear-gradient(to right, transparent, #dbeafe, #b39ddb20)",
                                overflow: "hidden",
                                p: 5,
                                mt: 3
                            }}>
                                {/* Background Image */}
                                <Box
                                    sx={{
                                        backgroundImage: "url('/images/cards/hr-dashboard.png')",
                                        position: "absolute",
                                        inset: 0,
                                        backgroundSize: "cover",
                                        opacity: 0.3,
                                        zIndex: 0,
                                    }}
                                />

                                {/* Card Content */}
                                <Box sx={{ position: "relative", zIndex: 1 }}>
                                    {/* Header Section */}
                                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                                        {/* Avatar Section */}
                                        <Avatar
                                            src="/images/avatars/avatar-2.png"
                                            alt="Nakisha Short"
                                            sx={{
                                                backgroundColor: "#ede7f6",
                                                width: 40,
                                                height: 40,
                                            }}
                                        />
                                        {/* Name and Details */}
                                        <Box>
                                            <Typography variant="body1" fontWeight={600} component="div" gutterBottom fontSize={'14px'}>
                                                Nakisha Short
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Her Birthday Today
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Wish Button */}
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            color: "#fff",
                                            textTransform: "capitalize",
                                            "&:hover": {
                                                backgroundColor: theme.palette.primary.hover,
                                            },
                                        }}
                                    >
                                        Wish Her
                                    </Button>
                                </Box>

                                {/* Birthday Image */}
                                <Box
                                    component="img"
                                    src="/images/cards/birthday.png"
                                    alt="Birthday Icon"
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        height: "110px",
                                    }}
                                />
                            </Card>
                        </Grid>

                        <Grid item xs={12}>
                            <Card sx={{ p: 5, mt: 5 }}>
                                <Box display="flex" alignItems="baseline" gap={2} mb={3}>
                                    <Typography variant="subtitle1" fontWeight={600} mb={3} flexGrow={1}>
                                        Recent Payroll
                                    </Typography>
                                    <Box>
                                        <IconButton
                                            aria-controls={openRecent ? 'recent-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openRecent ? 'true' : undefined}
                                            onClick={handleMenuRecent}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                backgroundColor: 'white',
                                                color: 'text.secondary',
                                                '&:hover': {
                                                    backgroundColor: 'grey.100',
                                                    color: 'text.secondary',
                                                },
                                            }}
                                        >
                                            <DotsVertical />
                                        </IconButton>
                                        <Menu
                                            id="recent-menu"
                                            anchorEl={anchorElRecent}
                                            open={openRecent}
                                            onClose={handleMenuCloseRecent}
                                            PaperProps={{
                                                style: {
                                                    minWidth: '10rem',
                                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                },
                                            }}
                                        >
                                            {['Today', 'Yesterday', 'Thursday'].map((option) => (
                                                <MenuItem
                                                    key={option}
                                                    onClick={handleMenuClose}
                                                    sx={{
                                                        fontSize: '1rem',
                                                        color: 'text.secondary',
                                                        '&:hover': {
                                                            backgroundColor: 'grey.100',
                                                            color: 'text.primary',
                                                        },
                                                    }}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        height: "198px",
                                        overflowY: "auto",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: '18px'
                                    }}
                                >
                                    {payrollData.map((item, index) => (
                                        <Box key={index} display="flex" justifyContent={'space-between'} alignItems="center" gap={2}>
                                            <Box display={'flex'} gap={2}>
                                                {/* Icon */}
                                                <Avatar
                                                    sx={{
                                                        width: 24,
                                                        height: 24,
                                                        bgcolor: 'transparent'
                                                    }}
                                                >
                                                    {item.status === "Paid" || item.status === "Pending" ? (
                                                        <ArrowBottomLeft fontSize="small" color='success' />
                                                    ) : (
                                                        <ArrowTopRight fontSize="small" color='error' />
                                                    )}
                                                </Avatar>

                                                {/* Name */}
                                                <Typography variant='subtitle1' fontSize={'14px'} fontWeight={600}>{item.name}</Typography>
                                            </Box>

                                            <Box display={'flex'} gap={2}>
                                                {/* Amount */}
                                                <Typography variant='subtitle1' fontSize={'14px'} fontWeight={600}>{item.amount}</Typography>

                                                {/* Status */}
                                                <Chip
                                                    label={item.status}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: '11px',
                                                        paddingTop: '.125rem',
                                                        paddingBottom: '.125rem',
                                                        paddingLeft: '.625rem',
                                                        paddingRight: '.625rem',
                                                        borderRadius: '.25rem',
                                                        marginRight: '15px',
                                                        bgcolor:
                                                            item.color === "error"
                                                                ? "rgb(254, 226, 226)"
                                                                : item.color === "success"
                                                                    ? "rgb(210, 244, 238)"
                                                                    : "rgb(254, 249, 195)",
                                                        color:
                                                            item.color === "error"
                                                                ? "rgb(239, 68, 68)"
                                                                : item.color === "success"
                                                                    ? "rgb(36, 151, 130)"
                                                                    : "rgb(234, 179, 8) ",
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default HRDashboard
