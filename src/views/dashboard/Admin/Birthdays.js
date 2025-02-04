import React from "react";
import { Card, CardHeader, CardContent, Typography, Avatar, Button, Box, Divider, useTheme } from "@mui/material";
import { Cake } from "mdi-material-ui";

const birthdays = [
    { name: "Andrew Jermia", role: "IOS Developer", avatar: "images/avatars/avatar-2.png", date: "Today" },
    { name: "Mary Zeen", role: "UI/UX Designer", avatar: "images/avatars/avatar-3.png", date: "Tomorrow" },
    { name: "Antony Lewis", role: "Android Developer", avatar: "images/avatars/avatar-7.png", date: "Tomorrow" },
    { name: "Doglas Martini", role: ".Net Developer", avatar: "images/avatars/avatar-10.png", date: "25 Jan 2025" }
];

const groupByDate = (birthdays) => {
    return birthdays.reduce((acc, person) => {
        if (!acc[person.date]) {
            acc[person.date] = [];
        }
        acc[person.date].push(person);
        return acc;
    }, {});
};

const Birthdays = () => {
    const theme = useTheme();
    const groupedBirthdays = groupByDate(birthdays);

    return (
        <Card sx={{ height: "509px" }}>
            <CardHeader title={<Typography fontSize={16} fontWeight={600}>Birthdays</Typography>}
                action={<Button
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
                </Button>}
            />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                {Object.entries(groupedBirthdays).map(([date, people]) => (
                    <Box key={date} style={{ marginBottom: "15px" }}>
                        <Typography variant="subtitle2" gutterBottom fontsize={14} fontWeight={600}>
                            {date}
                        </Typography>
                        {people.map((person, index) => (
                            <Box key={index} style={{ background: "#f8f9fa", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
                                <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box style={{ display: "flex", alignItems: "center" }}>
                                        <Avatar src={person.avatar} />
                                        <Box style={{ marginLeft: "10px" }}>
                                            <Typography variant="body1" fontSize={14} fontWeight={600}>{person.name}</Typography>
                                            <Typography variant="body2" color="textSecondary">{person.role}</Typography>
                                        </Box>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        // startIcon={<Cake />}
                                        sx={{
                                            backgroundColor: '#3B7080',
                                            border: '1px solid #3B7080',
                                            color: '#FFF',
                                            padding: '0.25rem 0.5rem',
                                            fontSize: '0.6rem',
                                            borderRadius: '5px',
                                            transition: 'all 0.5s',
                                            fontWeight: 500
                                        }}
                                    >
                                        Send
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ))}
            </CardContent>
        </Card >
    );
};

export default Birthdays;
