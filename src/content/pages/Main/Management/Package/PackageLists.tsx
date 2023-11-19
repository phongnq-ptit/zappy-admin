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
  useTheme,
  Checkbox
} from '@mui/material';
import React, { useEffect } from 'react';
import { usePackageStore } from './store';
import usePackageApi from 'src/hooks/usePackageApi';
import _ from 'lodash';
import SkeletonLists from './SkeletonLists';
import FilterPackage from './FilterPackage';
import PackageItem from './PackageItem';

const PackageLists = () => {
  const theme = useTheme();
  const { getPackageLists } = usePackageApi();
  const {
    packages,
    onChangePackages,
    loading,
    onChangeLoading,
    queryParams,
    handleChangePage,
    handleChangeRowsPerPage,
    listMetadata,
    onChangeListMetadata,
    selected,
    onChangeSelected
  } = usePackageStore();

  useEffect(() => {
    onChangeLoading(true);
    getPackageLists(queryParams)
      .then((response) => {
        onChangePackages(response.data.results);
        onChangeListMetadata(response.data.metadata);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setTimeout(() => {
          onChangeLoading(false);
        }, 500);
      });
  }, [queryParams]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChangeSelected(
        _.uniq([...selected, ...packages.map((item) => item.id)])
      );
    } else {
      onChangeSelected([]);
    }
  };

  return (
    <Grid container spacing={2} flexDirection="column">
      <Grid item xs={12}>
        <FilterPackage />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Checkbox color="primary" onChange={handleSelectAll} />
                  </TableCell>
                  <TableCell>Tên Gói</TableCell>
                  <TableCell align="center">Giá Gốc</TableCell>
                  <TableCell align="center">Vàng Quy Đổi</TableCell>
                  <TableCell align="center">Giảm giá</TableCell>
                  <TableCell align="right">Ngày bắt đầu/Kết thúc</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <SkeletonLists />
                ) : (
                  packages.map((value) => (
                    <PackageItem _package={value} key={value.id} />
                  ))
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

export default PackageLists;
