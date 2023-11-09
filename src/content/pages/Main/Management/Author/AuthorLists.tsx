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
import { ApiListResponse, QueryParams } from 'src/types/interfaces/Base';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import SkeletonAuthors from './SkeletonAuthors';
import FilterAuthor from './FilterAuthor';
import TextTruncate from 'react-text-truncate';
import { useAuthorStore } from './store';
import EditAuthorDialog from './EditAuthorDialog';

interface Props {
  api: (params: QueryParams) => Promise<ApiListResponse<Author[]>>;
}

const AuthorLists = (props: Props) => {
  const theme = useTheme();
  const {
    authors,
    onChangeAuthors,
    listMetadata,
    onChangeListMetadata,
    queryParams,
    reload,
    handleChangePage,
    handleChangeRowsPerPage,
    skeletonLoading,
    onChangeSkeletonLoading
  } = useAuthorStore();
  const [openEdit, setOpenEdit] = useState(false);
  const [authorEdit, setAuthorEdit] = useState<Author>({} as Author);

  useEffect(() => {
    onChangeSkeletonLoading(true);
    props
      .api(queryParams)
      .then((response) => {
        onChangeAuthors(response.data.results);
        onChangeListMetadata(response.data.metadata);
      })
      .catch((e) => console.log(e))
      .finally(() =>
        setTimeout(() => {
          onChangeSkeletonLoading(false);
        }, 750)
      );
  }, [queryParams, reload]);

  return (
    <React.Fragment>
      <Grid container spacing={2} flexDirection="column">
        <Grid item>
          <FilterAuthor />
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
                  {skeletonLoading ? (
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
                                onClick={() => {
                                  setAuthorEdit(author);
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
      <EditAuthorDialog
        open={openEdit}
        setOpen={setOpenEdit}
        authorEdit={authorEdit}
      />
    </React.Fragment>
  );
};

export default AuthorLists;
