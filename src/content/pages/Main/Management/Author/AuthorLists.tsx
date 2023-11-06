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
import TypeChip from 'src/components/Common/Media/TypeChip';
import { Author } from 'src/types/interfaces/Author';
import {
  ApiListResponse,
  ListMetadata,
  QueryParams,
  defaultListMetadata
} from 'src/types/interfaces/Base';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import SkeletonAuthors from './SkeletonAuthors';
import FilterAuthor from './FilterAuthor';
import TextTruncate from 'react-text-truncate';
import { MediaTabs } from 'src/types/enums/MediaTabs';

interface Props {
  reload: boolean;
  api: (params: QueryParams) => Promise<ApiListResponse<Author[]>>;
}

const AuthorLists = (props: Props) => {
  const theme = useTheme();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [listMetadata, setListMetadata] =
    useState<ListMetadata>(defaultListMetadata);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: 10,
    page: 1,
    search: undefined
  });
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  // const [genreEdit, setGenreEdit] = useState<Genre>({} as Genre);

  useEffect(() => {
    setLoading(true);
    props
      .api(queryParams)
      .then((response) => {
        setAuthors(response.data.results);
        setListMetadata(response.data.metadata);
      })
      .catch((e) => console.log(e))
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 750)
      );
  }, [queryParams, props.reload]);

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
          <FilterAuthor query={queryParams} setQuery={setQueryParams} />
        </Grid>
        <Grid item>
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Tên tác giả</TableCell>
                    <TableCell align="center" sx={{ maxWidth: '10rem' }}>
                      Mô tả
                    </TableCell>
                    <TableCell align="right">Ngày Tạo/Cập Nhật</TableCell>
                    <TableCell align="right">Loại</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <SkeletonAuthors />
                  ) : (
                    authors.map((author, index) => {
                      return (
                        <TableRow hover key={author.id}>
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
                              {author.name}
                            </Typography>
                          </TableCell>
                          <TableCell align="center" sx={{ maxWidth: '10rem' }}>
                            <TextTruncate
                              line={2}
                              element="span"
                              truncateText="…"
                              text={author.description}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {format(
                                new Date(author.createdAt),
                                'HH:mm, dd/MM/yyy'
                              )}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {format(
                                new Date(author.updatedAt),
                                'HH:mm, dd/MM/yyy'
                              )}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <TypeChip type={author.type} />
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip
                              title="Cập nhật thông tin tác giả"
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
                                //   onClick={() => {
                                //     setGenreEdit(genre);
                                //     setOpenEdit(true);
                                //   }}
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
      {/* <EditGenreDialog
          open={openEdit}
          setOpen={setOpenEdit}
          genre={genreEdit}
        /> */}
    </React.Fragment>
  );
};

export default AuthorLists;
