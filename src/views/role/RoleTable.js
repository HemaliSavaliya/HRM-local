import {
  Box,
  Chip,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { roleCells } from 'src/TableHeader/TableHeader';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { getComparator, stableSort } from 'src/common/CommonLogic';

const statusObj = {
  Enable: 'success',
  Disable: 'error'
};

const RoleTable = ({ searchQuery, roleData, loading, updateRoleStatus }) => {
  // for table sorting and pagination
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('roleName'); // Default sorting by Role Name
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();

  // Filter data based on search query
  const filteredData = roleData.filter((role) => {
    return (
      role?.roleName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role?.date.includes(searchQuery) ||
      role?.status?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle sort request
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const visibleRows = stableSort(filteredData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // For toggle status
  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === 'Enable' ? 'Disable' : 'Enable';
    updateRoleStatus(id, newStatus);
  };

  return (
    <>
      <Toaster />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Box sx={{ width: '100%' }}>
          {loading ? (
            <TableContainer sx={{ height: '245px', border: `1px solid ${theme.palette.action.focus}` }}>
              <Table stickyHeader sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  headCells={roleCells}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {Array.from(new Array(rowsPerPage)).map((_, index) => (
                    <TableRow key={index}>
                      {roleCells.map((cell) => (
                        <TableCell key={cell.id}>
                          <Skeleton variant="text" height={25} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : visibleRows.length === 0 ? (
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
                  sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }}
                  size='small'
                  aria-label='a dense table'
                >
                  <EnhancedTableHead
                    headCells={roleCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {visibleRows.map((row, index) => (
                      <TableRow key={row.id} sx={{ cursor: 'pointer' ,}} >
                        <TableCell align="left">{index + 1 + page * rowsPerPage}</TableCell>
                        <TableCell align="left">{row.roleName}</TableCell>
                        <TableCell align="left">{row.date}</TableCell>
                        <TableCell align="left">
                          <Chip
                            label={row.status}
                            color={statusObj[row.status]}
                            onClick={() => handleStatusToggle(row.id, row.status)}
                            sx={{
                              height: 24,
                              fontSize: '0.75rem',
                              textTransform: 'capitalize',
                              '& .MuiChip-label': { fontWeight: 500 }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={roleCells.length} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length} // Update count based on filtered data
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Box>
      </motion.div>
    </>
  );
};

export default RoleTable;
