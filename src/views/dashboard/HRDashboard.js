import { Avatar, Box, Button, ButtonGroup, Card, Divider, Grid, Link, List, ListItem, Paper, Typography } from '@mui/material'
import { ChevronRight } from 'mdi-material-ui'
import React from 'react'
import dynamic from 'next/dynamic';
const EmployeeChart = dynamic(() => import('./charts/EmployeeChart'), { ssr: false });
const TotalApplicationChart = dynamic(() => import('./charts/ApplicationChart'), { ssr: false });
const HiredCandidatesChart = dynamic(() => import('./charts/HiredCandidates'), { ssr: false });
const RejectedCandidatesChart = dynamic(() => import('./charts/RejectedCandidates'), { ssr: false });
const ApplicationReceivedChart = dynamic(() => import('./charts/ApplicationReceivedChart'), { ssr: false });

const EventItem = ({ day, month, title, time, creator }) => (
    <Grid container spacing={2} alignItems="center">
        <Grid item>
            <Paper sx={{ width: '3rem', height: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: 1, borderColor: 'rgb(226 232 240 / 1)', borderRadius: .125, boxShadow: 'none' }}>
                <Typography variant="subtitle1">{day}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{month}</Typography>
            </Paper>
        </Grid>
        <Grid item xs>
            <Typography variant="body1"> {title}
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
                    {/* <ButtonGroup size="small" variant="contained">
                        <Button sx={{ bgcolor: 'custom.500', color: 'white' }}>All</Button>
                        <Button sx={{ bgcolor: 'sky.100', color: 'sky.500' }}>1M</Button>
                        <Button sx={{ bgcolor: 'sky.100', color: 'sky.500' }}>6M</Button>
                        <Button sx={{ bgcolor: 'sky.100', color: 'sky.500' }}>1Y</Button>
                    </ButtonGroup> */}
                </Box>
                <ApplicationReceivedChart />
            </Card>

            <Grid container spacing={3} mt={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ p: 5 }}>
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="subtitle2" sx={{ marginBottom: 3 }}>Upcoming Scheduled</Typography>
                            <Box id="calendar" sx={{ width: 'auto', padding: 1 }}>
                            </Box>
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
                <Grid item xs={12} sm={6} md={4}></Grid>
                <Grid item xs={12} sm={6} md={4}></Grid>
            </Grid>
        </Box>
    )
}

export default HRDashboard
