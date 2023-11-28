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
import { useMovieStore } from './store';
import useMovieApi from 'src/hooks/useMovieApi';
import MovieItem from './MovieItem';
import SkeletonMovies from './SkeletonMovies';
import FilterMovie from './FilterMovie';

const MovieLists = () => {
  const theme = useTheme();
  const { getMovieLists } = useMovieApi();
  const {
    movies,
    onChangeMovies,
    loading,
    onChangeLoading,
    queryParams,
    handleChangePage,
    handleChangeRowsPerPage,
    listMetadata,
    onChangeListMetadata,
    selected,
    onChangeSelected
  } = useMovieStore();

  useEffect(() => {
    onChangeLoading(true);
    getMovieLists(queryParams)
      .then((response) => {
        onChangeMovies(response.data.results);
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
      onChangeSelected(_.uniq([...selected, ...movies.map((item) => item.id)]));
    } else {
      onChangeSelected([]);
    }
  };

  return (
    <Grid container spacing={2} flexDirection="column">
      <Grid item xs={12}>
        <FilterMovie />
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
                  <TableCell>Tên Phim</TableCell>
                  <TableCell align="center">Ngày ra mắt</TableCell>
                  <TableCell align="center">Thời Lượng</TableCell>
                  <TableCell align="center">Lượt xem/Lượt thích</TableCell>
                  <TableCell align="center">Giá vàng</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <SkeletonMovies />
                ) : (
                  movies.map((value) => (
                    <MovieItem movie={value} key={value.id} />
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

export default MovieLists;
