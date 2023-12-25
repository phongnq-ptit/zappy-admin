import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import AddChapterDialog from './AddChapterDialog';
import { useChapterStore } from '../store';
import useChapterApi from 'src/hooks/useChapterApi';
import { useComicStore } from '../../store';
import ChapterItem from './ChapterItem';
import _ from 'lodash';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';
import DeleteChapterDialog from './DeleteChapterDialog';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

const ChapterLists = () => {
  const navigate = useNavigate();
  const [AddChapter, setAddChapter] = useState(false);
  const { comic } = useComicStore();
  const {
    chapters,
    onChangeChapters,
    listMetadata,
    queryParams,
    handleChangePage,
    handleChangeRowsPerPage,
    onChangeListMetadata,
    reload,
    selected,
    onChangeSelected
  } = useChapterStore();
  const { getChapterLists, deleteChapter } = useChapterApi();

  const [loading, setLoading] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    setLoading(true);
    getChapterLists(comic.id, queryParams)
      .then((response) => {
        onChangeChapters(response.data.results);
        onChangeListMetadata(response.data.metadata);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, [queryParams, reload]);

  useEffect(() => {
    onChangeSelected([]);
  }, [listMetadata.currentPage]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChangeSelected(
        _.uniq([...selected, ...chapters.map((item) => item.id)])
      );
    } else {
      onChangeSelected([]);
    }
  };

  const handleRemoveItemLists = () => {
    setLoadingRemove(true);
    deleteChapter(selected)
      .then((response) => {
        SuccessSnackbar('Xóa tập thành công!');
        onChangeChapters([
          ...chapters.filter((item) => !selected.includes(item.id))
        ]);
        onChangeListMetadata({
          ...listMetadata,
          totalItems: listMetadata.totalItems - selected.length
        });
      })
      .finally(() => {
        setLoadingRemove(false);
        setOpenDelete(false);
        onChangeSelected([]);
      });
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} flexDirection="column">
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ float: 'left' }}
            onClick={() => setAddChapter(true)}
          >
            Thêm Tập Mới
          </Button>
          {selected.length > 0 && (
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDelete(true)}
              startIcon={<DeleteForeverTwoToneIcon />}
              sx={{ float: 'right', mr: 1 }}
            >
              Xóa dòng đã chọn
            </Button>
          )}
        </Grid>
        <Grid item>
          <Grid container spacing={2} flexDirection="column" mt={1}>
            <Grid item xs={12}>
              <Card>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <Checkbox
                            color="primary"
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell align="center">Tập số</TableCell>
                        <TableCell align="center">Tên tập</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        // <SkeletonMovies />
                        <>skelaton</>
                      ) : (
                        chapters.map((value) => (
                          <ChapterItem chapter={value} key={value.id} />
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
        </Grid>
      </Grid>
      {AddChapter && (
        <AddChapterDialog open={AddChapter} setOpen={setAddChapter} />
      )}
      {openDelete && (
        <DeleteChapterDialog
          open={openDelete}
          setOpen={setOpenDelete}
          onAction={handleRemoveItemLists}
          loading={loadingRemove}
        />
      )}
    </React.Fragment>
  );
};

export default ChapterLists;
