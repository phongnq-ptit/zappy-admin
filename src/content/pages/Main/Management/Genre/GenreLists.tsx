import {
  Box,
  Card,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Genre } from 'src/types/interfaces/Genre';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  ApiListResponse,
  ListMetadata,
  QueryParams,
  defaultListMetadata
} from 'src/types/interfaces/Base';
import TypeChip from '../../../../../components/Common/Media/TypeChip';
import SkeletonGenre from './SkeletonGenre';
import FilterMedia from './FilterMedia';
import EditGenreDialog from './EditGenreDialog';
import { TypeItem } from 'src/types/enums/TypeItem';

interface Props {
  api: (params: QueryParams) => Promise<ApiListResponse<Genre[]>>;
}

const GenreLists = (props: Props) => {
  const theme = useTheme();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [listMetadata, setListMetadata] =
    useState<ListMetadata>(defaultListMetadata);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: 10,
    page: 1,
    search: undefined
  });
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [genreEdit, setGenreEdit] = useState<Genre>({} as Genre);
  // const [genreEdit, setGenreEdit] = useState<Genre>({
  //   id: 0,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   name: '',
  //   type: TypeItem.Comics
  // });

  useEffect(() => {
    setLoading(true);
    props
      .api(queryParams)
      .then((response) => {
        setGenres(response.data.results);
        setListMetadata(response.data.metadata);
      })
      .catch((e) => console.log(e))
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 750)
      );
  }, [queryParams]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQueryParams({
      ...queryParams,
      limit: Number(event.target.value),
      page: 1
    });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setQueryParams({ ...queryParams, page: newPage + 1 });
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} flexDirection="column">
        <Grid item>
          <FilterMedia query={queryParams} setQuery={setQueryParams} />
        </Grid>
        <Grid item>
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Tên Thể Loại</TableCell>
                    <TableCell align="right">Ngày Tạo</TableCell>
                    <TableCell align="right">Ngày Cập Nhật</TableCell>
                    <TableCell align="right">Loại</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <SkeletonGenre />
                  ) : (
                    genres.map((genre, index) => {
                      return (
                        <TableRow hover key={genre.id}>
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {index + 1 + '.'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {genre.name}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {format(
                                new Date(genre.createdAt),
                                'HH:mm, dd/MM/yyy'
                              )}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {format(
                                new Date(genre.updatedAt),
                                'HH:mm, dd/MM/yyy'
                              )}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <TypeChip type={genre.type} />
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip
                              title="Cập nhật thông tin thể loại"
                              arrow
                              placement="top"
                            >
                              <IconButton
                                sx={{
                                  '&:hover': {
                                    background: theme.colors.primary.lighter
                                  },
                                  color: theme.palette.primary.main
                                }}
                                color="inherit"
                                size="small"
                                onClick={() => {
                                  setGenreEdit(genre);
                                  setOpenEdit(true);
                                }}
                              >
                                <EditTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
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
      <EditGenreDialog
        open={openEdit}
        setOpen={setOpenEdit}
        genre={genreEdit}
      />
    </React.Fragment>
  );
};

export default GenreLists;
