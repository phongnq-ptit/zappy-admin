import {
  Box,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import React, { useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import FilterAccount from './FilterAccount';
import _ from 'lodash';
import { format } from 'date-fns';
import Label from 'src/components/Label';
import SkeletonAccountLists from './SkeletonAccountLists';
import { Pathname } from 'src/routes/path';
import { useAccountStore } from './store';
import useUserApi from 'src/hooks/useUserApi';

const AccountLists = () => {
  const theme = useTheme();
  const { getAllUser } = useUserApi();
  const {
    loading,
    onChangeLoading,
    accounts,
    onChangeAccounts,
    queryParams,
    handleChangePage,
    handleChangeRowsPerPage,
    listMetadata,
    onChangeListMetadata,
    reload
  } = useAccountStore();

  useEffect(() => {
    onChangeLoading(true);
    getAllUser(queryParams)
      .then((response) => {
        onChangeAccounts(response.data.results);
        onChangeListMetadata(response.data.metadata);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setTimeout(() => {
          onChangeLoading(false);
        }, 500);
      });
  }, [queryParams, reload]);

  return (
    <Grid container spacing={2} flexDirection="column">
      <Grid item xs={12}>
        <FilterAccount />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Người Dùng</TableCell>
                  <TableCell>Email/SĐT</TableCell>
                  <TableCell>Số Vàng</TableCell>
                  <TableCell>Số Hồ Sơ</TableCell>
                  <TableCell align="right">Ngày Tạo/Cập Nhật</TableCell>
                  <TableCell align="center">Trạng Thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <SkeletonAccountLists />
                ) : (
                  accounts.map((user, index) => {
                    return (
                      <TableRow hover key={user.id}>
                        <TableCell>
                          <RouterLink
                            to={`/${Pathname.users}/${user.id}`}
                            style={{
                              fontSize: '1rem',
                              fontWeight: 500,
                              color: theme.colors.secondary.main
                            }}
                          >
                            {user.username}
                          </RouterLink>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {user.email}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {user.phone}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {user.golds + ' Vàng'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {user?.profilesCount + ' Hồ sơ'}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {format(
                              new Date(user.createdAt),
                              'HH:mm, dd/MM/yyy'
                            )}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {format(
                              new Date(user.updatedAt),
                              'HH:mm, dd/MM/yyy'
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Label color={user.isActive ? 'success' : 'error'}>
                            {user.isActive ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                          </Label>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={listMetadata.totalItems}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={listMetadata.currentPage - 1}
              rowsPerPage={listMetadata.itemsPerPage}
              rowsPerPageOptions={[10, 25, 30]}
              labelDisplayedRows={({ from, to, count }) =>
                `Đang hiển thị ${from} - ${to} của ${count}`
              }
              labelRowsPerPage={'Số lượng hiển thị'}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AccountLists;
