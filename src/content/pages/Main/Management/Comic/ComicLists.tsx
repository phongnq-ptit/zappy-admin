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
import _ from 'lodash';
import { useComicStore } from './store';
import useComicApi from 'src/hooks/useComicApi';
import SkeletonComics from './SkeletonComics';
import ComicItem from './ComicItem';

const ComicLists = () => {
  const theme = useTheme();
  const { getComicLists } = useComicApi();
  const {
    comics,
    onChangeComics,
    loading,
    onChangeLoading,
    queryParams,
    handleChangePage,
    handleChangeRowsPerPage,
    listMetadata,
    onChangeListMetadata,
    selected,
    onChangeSelected
  } = useComicStore();

  useEffect(() => {
    onChangeLoading(true);
    getComicLists(queryParams)
      .then((response) => {
        onChangeComics(response.data.results);
        onChangeListMetadata(response.data.metadata);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setTimeout(() => {
          onChangeLoading(false);
        }, 500);
      });
  }, [queryParams]);

  useEffect(() => {
    onChangeSelected([]);
  }, [listMetadata.currentPage]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChangeSelected(_.uniq([...selected, ...comics.map((item) => item.id)]));
    } else {
      onChangeSelected([]);
    }
  };

  return (
    <Grid container spacing={2} flexDirection="column" mt={1}>
      <Grid item xs={12}>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Checkbox color="primary" onChange={handleSelectAll} />
                  </TableCell>
                  <TableCell>Tên Truyện</TableCell>
                  <TableCell align="center">Ngày ra mắt</TableCell>
                  <TableCell align="center">Số tập</TableCell>
                  <TableCell align="center">Giá vàng</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <SkeletonComics />
                ) : (
                  comics.map((value) => (
                    <ComicItem comic={value} key={value.id} />
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

export default ComicLists;
