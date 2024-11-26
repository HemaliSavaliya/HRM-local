import React, { useState } from 'react'
import {
    Card,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Button,
    Typography,
    Skeleton,
    useTheme
} from '@mui/material'
import useAllLeaveReqData from 'src/hooks/useAllLeaveReqData'
import { motion } from 'framer-motion'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'
import { allLeaveCells } from 'src/TableHeader/TableHeader'
import { getComparator, stableSort } from 'src/common/CommonLogic'

const LeaveRequest = () => {
    const { leaveReqData, updateLeaveRequestStatus, loading } = useAllLeaveReqData()

    // for table
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('name')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const theme = useTheme()

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
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - leaveReqData.length) : 0

    const visibleRows = stableSort(leaveReqData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    )

    const handleApprove = (id) => {
        const leaveRequest = leaveReqData.find((req) => req.id === id);

        if (!leaveRequest) {
            console.error("Leave request not found!");
            return;
        }

        const { leaveName, startDate, endDate, leaveType } = leaveRequest;

        // Calculate total days of leave
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : start; // Default to single day if endDate is missing
        const totalDays = leaveType === "Half Day" ? 0.5 : (end - start) / (1000 * 60 * 60 * 24) + 1;

        // Fetch leave balances from localStorage
        const leaveBalanceData = JSON.parse(localStorage.getItem("leaveType")) || [];

        const updatedLeaveBalanceData = leaveBalanceData.map((balance) => {
            if (balance.leaveName === leaveName) {
                // Calculate new values
                const newTotalUtilized = (balance.totalUtilized || 0) + totalDays;
                const newTotalBalanced = (balance.leaveBalance || 0) - totalDays;

                if (newTotalBalanced < 0) {
                    console.error(`Insufficient leave balance for ${leaveName}.`);
                    return balance; // Skip updates if balance is insufficient
                }

                return {
                    ...balance,
                    totalUtilized: newTotalUtilized,
                    totalBalanced: newTotalBalanced,
                };
            }
            return balance;
        });

        // Save updated leave balance back to localStorage
        localStorage.setItem("leaveType", JSON.stringify(updatedLeaveBalanceData));

        // Update state and status
        updateLeaveRequestStatus(id, "Approved");
        // setLeaveBal(updatedLeaveBalanceData); // Update Leave Balance state in UI
    };

    const handleReject = (id) => {
        const leaveRequest = leaveReqData.find((req) => req.id === id);

        if (!leaveRequest) {
            console.error("Leave request not found!");
            return;
        }

        // Simply update the status to "Rejected"
        updateLeaveRequestStatus(id, "Rejected");
    };

    return (
        <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exist={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.25 }}
            >
                <Box sx={{ width: '100%' }}>
                    {loading ? (
                        <TableContainer sx={{ height: '235px', border: `1px solid ${theme.palette.action.focus}` }}>
                            <Table stickyHeader sx={{ minWidth: { xs: 1500, sm: 1500, lg: 1500 } }} aria-labelledby='tableTitle'>
                                <EnhancedTableHead
                                    headCells={allLeaveCells}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {Array.from(new Array(rowsPerPage)).map((_, index) => (
                                        <TableRow key={index}>
                                            {allLeaveCells.map(cell => (
                                                <TableCell key={cell.id}>
                                                    <Skeleton variant='text' height={25} />
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
                            <TableContainer sx={{ height: '235px', border: `1px solid ${theme.palette.action.focus}` }}>
                                <Table
                                    stickyHeader
                                    sx={{ minWidth: { xs: 1500, sm: 1500, lg: 1500 } }}
                                    size='small'
                                    aria-label='a dense table'
                                >
                                    <EnhancedTableHead
                                        headCells={allLeaveCells}
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody>
                                        {visibleRows.map((row, index) => {
                                            return (
                                                <TableRow key={row.id} sx={{ cursor: 'pointer' }}>
                                                    <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                                                    <TableCell align='left'>{row.name}</TableCell>
                                                    <TableCell align='left'>{row.applyingDate}</TableCell>
                                                    <TableCell align='left'>{row.leaveName}</TableCell>
                                                    <TableCell align='left'>{row.startDate}</TableCell>
                                                    <TableCell align='left'>{row.endDate || '-'}</TableCell>
                                                    <TableCell align='left'>{row.leaveType}</TableCell>
                                                    <TableCell align='left'>{row.description}</TableCell>
                                                    <TableCell align='left'>
                                                        {(row.status === 'pending' || !row.status) && (
                                                            <>
                                                                <Button
                                                                    size='small'
                                                                    variant='contained'
                                                                    color='success'
                                                                    sx={{ color: '#FFF !important', mr: 3 }}
                                                                    onClick={() => handleApprove(row.id)}
                                                                >
                                                                    Approved
                                                                </Button>
                                                                <Button
                                                                    size='small'
                                                                    variant='contained'
                                                                    color='error'
                                                                    sx={{ color: '#FFF !important' }}
                                                                    onClick={() => handleReject(row.id)}
                                                                >
                                                                    Rejected
                                                                </Button>
                                                            </>
                                                        )}
                                                        {row.status === 'Approved' && (
                                                            <Button
                                                                size='small'
                                                                variant='contained'
                                                                color='success'
                                                                sx={{ color: '#FFF !important' }}
                                                            >
                                                                Approved
                                                            </Button>
                                                        )}
                                                        {row.status === 'Rejected' && (
                                                            <Button
                                                                size='small'
                                                                variant='contained'
                                                                color='error'
                                                                sx={{ color: '#FFF !important' }}
                                                                disabled
                                                            >
                                                                Rejected
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}

                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={allLeaveCells.length} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component='div'
                                count={leaveReqData.length}
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

export default LeaveRequest
