import React, { useState } from "react";
import { Card, CardHeader, CardContent, Typography, Button, useTheme, Divider, Tab, Tabs, Avatar, Box, IconButton, Badge } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Apple, CodeBraces, LanguageJavascript, LanguagePhp, Pencil } from "mdi-material-ui";

const jobs = [
    { title: "Senior IOS Developer", openings: 25, icon: <Apple /> },
    { title: "Junior PHP Developer", openings: 20, icon: <LanguagePhp /> },
    { title: "Junior React Developer", openings: 30, icon: <LanguageJavascript /> },
    { title: "Senior Laravel Developer", openings: 40, icon: <CodeBraces /> },
];

const applicants = [
    { name: "Brian Villalobos", experience: "5+ Years", role: "UI/UX Designer", avatar: "images/avatars/avatar-2.png" },
    { name: "Anthony Lewis", experience: "4+ Years", role: "Python Developer", avatar: "images/avatars/avatar-7.png" },
    { name: "Stephan Peralt", experience: "6+ Years", role: "Android Developer", avatar: "images/avatars/avatar-3.png" },
    { name: "Doglas Martini", experience: "2+ Years", role: "React Developer", avatar: "images/avatars/avatar-10.png" },
];

const badgeColors = ["#3B7080", "#1B84FF", "#FD3995", "#AB47BC"];

const JobApplicant = () => {
    const theme = useTheme();
    const [tabIndex, setTabIndex] = useState(1);

    return (
        <Card sx={{ height: 480, display: "flex", flexDirection: "column" }}>
            {/* Card Header */}
            <CardHeader title={<Typography fontSize={16} fontWeight={600}>Jobs Applicants</Typography>} action={
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        backgroundColor: theme.palette.mode === "light" ? '#F8F9FA' : "#f8f9fa14",
                        border: theme.palette.mode === "light" ? '1px solid #cbcbcb' : "1px solid #cbcbcb1f",
                        color: theme.palette.mode === "light" ? '#111827' : "#e1e3e7",
                        textTransform: 'capitalize',
                        "&:hover": {
                            backgroundColor: 'rgba(115, 102, 255, 0%)',
                            border: '1px solid #7366ff63',
                            color: "primary.main"
                        }
                    }}
                >
                    View All
                </Button>
            } />
            <Divider sx={{ margin: 0 }} />

            <CardContent>
                <Tabs
                    value={tabIndex}
                    onChange={(e, newValue) => setTabIndex(newValue)}
                    variant="fullWidth"
                    TabIndicatorProps={{ style: { display: "none" } }}
                    sx={{
                        "& .MuiTabs-flexContainer": {
                            height: "32px"
                        },
                        "& .MuiTabs-scroller": {
                            borderBlockEnd: 0,
                            backgroundColor: '#E5E7EB',
                            borderRadius: '7px',
                            marginBlockEnd: '1rem',
                            marginBottom: "25px !important"
                        }
                    }}
                >
                    <Tab
                        label="Openings"
                        sx={{
                            minHeight: "32px",
                            backgroundColor: tabIndex === 0 ? "#F26522 !important" : "transparent",
                            color: tabIndex === 0 ? "#FFF !important" : "inherit",
                            boxShadow: tabIndex === 0 ? "0px 4px 54px 0px rgba(224, 224, 224, 0.2509803922)" : "none",
                            transition: "color 0.15s ease-in",
                            borderRadius: "5px",
                            padding: "0.35rem 1rem"
                        }}
                    />
                    <Tab
                        label="Applicants"
                        sx={{
                            minHeight: "32px",
                            backgroundColor: tabIndex === 1 ? "#F26522 !important" : "transparent",
                            color: tabIndex === 1 ? "#FFF !important" : "inherit",
                            boxShadow: tabIndex === 1 ? "0px 4px 54px 0px rgba(224, 224, 224, 0.2509803922)" : "none",
                            transition: "color 0.15s ease-in",
                            borderRadius: "5px",
                            padding: "0.35rem 1rem"
                        }}
                    />
                </Tabs>

                <PerfectScrollbar style={{ maxHeight: "330px", overflow: "hidden" }}>
                    <Box hidden={tabIndex !== 0} mt={2} mr={4}>
                        {jobs.map((job, index) => (
                            <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mb={6}>
                                <Box display="flex" alignItems="center">
                                    <Avatar sx={{ backgroundColor: "grey.200", borderRadius: "5px" }}>{job.icon}</Avatar>
                                    <Box ml={3}>
                                        <Typography variant="body1" fontWeight="medium" fontSize={15}>{job.title}</Typography>
                                        <Typography variant="body2" fontSize={13}>No of Openings: {job.openings}</Typography>
                                    </Box>
                                </Box>
                                <IconButton size="small"><Pencil /></IconButton>
                            </Box>
                        ))}
                    </Box>

                    <Box hidden={tabIndex !== 1} mt={2} mr={6}>
                        {applicants.map((applicant, index) => (
                            <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mb={6}>
                                <Box display="flex" alignItems="center">
                                    <Avatar src={applicant.avatar} />
                                    <Box ml={3}>
                                        <Typography variant="body1" fontWeight="medium" fontSize={15}>{applicant.name}</Typography>
                                        <Typography variant="body2" fontSize={13}>Exp: {applicant.experience}</Typography>
                                    </Box>
                                </Box>
                                <Badge
                                    badgeContent={applicant.role}
                                    sx={{
                                        mb: 2,
                                        backgroundColor: badgeColors[index % badgeColors.length],
                                        color: "#FFF",
                                        padding: "4px 8px",
                                        borderRadius: "5px",
                                        "& .MuiBadge-badge": {
                                            fontSize: "10px",
                                            position: "relative !important",
                                            transform: "none"
                                        }
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </PerfectScrollbar>
            </CardContent>
        </Card>
    );
};

export default JobApplicant;
