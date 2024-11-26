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
    Skeleton
} from '@mui/material'
import { motion } from 'framer-motion'
import { Magnify } from 'mdi-material-ui'
import axios from 'axios'
import { getComparator, stableSort } from 'src/common/CommonLogic'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'
import { roleWiseCells } from 'src/TableHeader/TableHeader'

const RoleWiseAttendance = () => {
    // for table
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('name')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [roleAttendance, setRoleAttendance] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

    // Fetch data
    const fetchTimer = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/timer-list-role`, {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`
                }
            })

            setRoleAttendance(response.data)
        } catch (error) {
            console.error('Error fetching Role Wise Attendance', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTimer()
    }, [authToken?.token])

    // For Search data
    const handleSearch = event => {
        setSearchQuery(event.target.value.toLowerCase())
    }

    // Filter data based on search query
    const filteredData = roleAttendance.filter(row => {
        const lowerCaseQuery = searchQuery.toLowerCase()

        return (
            row.userName.toLowerCase().includes(lowerCaseQuery) ||
            row.date.toLowerCase().includes(lowerCaseQuery) ||
            row.role.toLowerCase().includes(lowerCaseQuery) ||
            row.status.toLowerCase().includes(lowerCaseQuery)
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
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exist={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.25 }}
        >
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end', mt: 3 }}>
                <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                    <TextField
                        autoComplete='off'
                        size='small'
                        placeholder='Search Here'
                        onChange={handleSearch}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <Magnify fontSize='small' />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
            </Box>
            <Card sx={{ mt: 3 }}>
                <Box sx={{ width: '100%' }}>
                    {loading ? (
                        <TableContainer sx={{ height: '380px' }}>
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
                            <TableContainer sx={{ height: '330px' }}>
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
            </Card>
        </motion.div>
    )
}

export default RoleWiseAttendance