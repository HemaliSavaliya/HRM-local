/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
    Card,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    TextField,
    InputAdornment,
    Typography,
    Skeleton,
    useTheme
} from '@mui/material'
import { motion } from 'framer-motion'
import { Magnify } from 'mdi-material-ui'
import { getComparator, stableSort } from 'src/common/CommonLogic'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'
import { roleWiseCells } from 'src/TableHeader/TableHeader'

const RoleWiseAttendance = () => {
    // for table
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('userName')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [roleAttendance, setRoleAttendance] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const theme = useTheme();

    const fetchTimerDataFromLocalStorage = () => {
        setLoading(true);
        try {
            const timerData = JSON.parse(localStorage.getItem('timerData')) || []; // Get all data from localStorage

            const loginDetails = JSON.parse(localStorage.getItem('login-details')) || {}; // Fetch user details
            const userRole = loginDetails.role; // Retrieve the logged-in user's role (e.g., 'admin' or 'hr')

            // Role-based filtering: if 'hr', show only 'employee' data; if 'admin', show all
            const filteredData =
                userRole === 'hr' ? timerData.filter((data) => data.role === 'employee') : timerData;

            const processedData = processAttendanceData(filteredData); // Process data for calculated fields
            setRoleAttendance(processedData);
        } catch (error) {
            console.error('Error fetching timer data from localStorage', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimerDataFromLocalStorage();
    }, []);

    const calculateTotalHours = (startTime, stopTime) => {
        if (!startTime || !stopTime) return 0; // Handle missing times

        try {
            // Parse the time strings into consistent Date objects
            const start = new Date(`1970-01-01T${convertTo24HourFormat(startTime)}`);
            const stop = new Date(`1970-01-01T${convertTo24HourFormat(stopTime)}`);

            if (isNaN(start.getTime()) || isNaN(stop.getTime())) {
                console.error('Invalid time format:', { startTime, stopTime });
                return 0;
            }

            const diffMs = stop - start; // Difference in milliseconds
            const diffHours = diffMs / (1000 * 60 * 60); // Convert to hours
            return diffHours.toFixed(2); // Round to 2 decimal places
        } catch (error) {
            console.error('Error calculating total hours:', error);
            return 0;
        }
    };

    // Helper function to convert time to 24-hour format
    const convertTo24HourFormat = (timeString) => {
        const [time, modifier] = timeString.split(' '); // Split into time and AM/PM
        let [hours, minutes, seconds] = time.split(':');

        if (modifier === 'PM' && hours !== '12') {
            hours = parseInt(hours, 10) + 12; // Convert PM to 24-hour
        } else if (modifier === 'AM' && hours === '12') {
            hours = '00'; // Midnight case
        }

        return `${hours}:${minutes}:${seconds}`;
    };

    const calculateStatus = (totalHours) => {
        if (totalHours >= 8) return 'Present';
        if (totalHours > 0) return 'Late';
        return 'Absent';
    };

    const processAttendanceData = (data) => {
        return data.map((row) => {
            const totalHours = calculateTotalHours(row.startTime, row.stopTime);
            const status = calculateStatus(totalHours);
            return { ...row, totalHours, status };
        });
    };

    // Handle search input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    // Filter data based on search query
    const filteredData = roleAttendance.filter(row => {
        const lowerCaseQuery = searchQuery.toLowerCase()

        return (
            row?.userName.toLowerCase().includes(lowerCaseQuery) ||
            row?.date.toLowerCase().includes(lowerCaseQuery) ||
            row?.role.toLowerCase().includes(lowerCaseQuery) ||
            row?.status.toLowerCase().includes(lowerCaseQuery)
        )
    })

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - roleAttendance.length) : 0

    const visibleRows = stableSort(filteredData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    )

    return (
        <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
            <Box
                sx={{
                    width: '100%',
                    display: { xs: 'grid', sm: 'flex', lg: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'end'
                }}
                mb={4}
            >
                <TextField
                    sx={{ mt: { xs: 3, sm: 0, lg: 0 } }}
                    label='Search Attendance'
                    variant='outlined'
                    size='small'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </Box>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exist={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.25 }}
            >
                <Box sx={{ width: '100%' }}>
                    {loading ? (
                        <TableContainer sx={{ height: '245px', border: `1px solid ${theme.palette.action.focus}` }}>
                            <Table stickyHeader sx={{ minWidth: 1500 }} aria-labelledby='tableTitle'>
                                <EnhancedTableHead
                                    headCells={roleWiseCells}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {Array.from(new Array(rowsPerPage)).map((_, index) => (
                                        <TableRow key={index}>
                                            {roleWiseCells.map(cell => (
                                                <TableCell key={cell.id}>
                                                    <Skeleton variant='text' />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : visibleRows && visibleRows.length === 0 ? (
                        <Typography
                            textTransform={'uppercase'}
                            letterSpacing={1}
                            fontSize={15}
                            my={6}
                            textAlign={'center'}
                            fontWeight={600}
                        >
                            No Data Available Yet!
                        </Typography>
                    ) : (
                        <>
                            <TableContainer sx={{ height: '245px', border: `1px solid ${theme.palette.action.focus}` }}>
                                <Table
                                    stickyHeader
                                    sx={{ minWidth: { xs: 1000, sm: 1000, lg: 1000 } }}
                                    size='small'
                                    aria-label='a dense table'
                                >
                                    <EnhancedTableHead
                                        headCells={roleWiseCells}
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody>
                                        {visibleRows.map((row, index) => {
                                            return (
                                                <TableRow key={row.id} sx={{ cursor: 'pointer' }}>
                                                    <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                                                    <TableCell align='left'>{row.userName}</TableCell>
                                                    <TableCell align='left'>{row.date}</TableCell>
                                                    <TableCell align='left'>{row.role}</TableCell>
                                                    <TableCell align='left'>{row.startTime}</TableCell>
                                                    <TableCell align='left'>{row.stopTime}</TableCell>
                                                    <TableCell align='left'>{row.totalHours}</TableCell>
                                                    <TableCell align='left'>{row.status}</TableCell>
                                                </TableRow>
                                            )
                                        })}

                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={roleWiseCells.length} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component='div'
                                count={roleAttendance.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    )}
                </Box>
            </motion.div>
        </Card>
    )
}

export default RoleWiseAttendance
