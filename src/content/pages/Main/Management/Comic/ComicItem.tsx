import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { formatDate } from 'src/utils/Helper';
import { useNavigate } from 'react-router';
import { Pathname } from 'src/routes/path';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Label from 'src/components/Label';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';
import { IComic } from 'src/types/interfaces/Comic';
import { useComicStore } from './store';
import useComicApi from 'src/hooks/useComicApi';
import DeleteComicsDialog from './DeleteComicDialog';

const ComicItem = ({ comic }: { comic: IComic }) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    selected,
    onChangeSelected,
    comics,
    onChangeComics,
    onChangeListMetadata,
    listMetadata
  } = useComicStore();
  const { deleteComic } = useComicApi();

  const getLabelState = (comic: IComic) => {
    const { state } = comic;
    switch (state) {
      case 0:
        return {
          color: 'success',
          text: 'Đang hoạt động'
        };
      case 1:
        return {
          color: 'warning',
          text: 'Chưa công khai'
        };
      default:
        return {
          color: 'black',
          text: 'Không hoạt động'
        };
    }
  };

  const handleRemoveItem = () => {
    setLoadingRemove(true);
    deleteComic([comic.id])
      .then((response) => {
        SuccessSnackbar('Xóa phim thành công!');
        onChangeComics([...comics.filter((item) => item.id !== comic.id)]);
        onChangeListMetadata({
          ...listMetadata,
          totalItems: listMetadata.totalItems - 1
        });
      })
      .finally(() => {
        setLoadingRemove(false);
        setOpenDelete(false);
      });
  };

  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell align="center">
          <Checkbox
            checked={selected.includes(comic.id)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.checked) {
                onChangeSelected([...selected, comic.id]);
              } else {
                onChangeSelected([
                  ...selected.filter((item) => item !== comic.id)
                ]);
              }
            }}
          />
        </TableCell>
        <TableCell>
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {comic.title}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            {comic?.publishDate
              ? formatDate(new Date(comic.publishDate))
              : 'N/A'}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {`${comic?.chaptersCount} tập`}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {`${comic.golds} vàng`}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Label color={getLabelState(comic).color as any}>
            {getLabelState(comic).text}
          </Label>
        </TableCell>
        <TableCell align="right">
          <Tooltip title="Cập nhật thông tin truyện" arrow placement="top">
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
                navigate(`/${Pathname.comics}/${comic.id}`);
              }}
            >
              <EditTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa truyện" arrow placement="top">
            <IconButton
              sx={{
                '&:hover': {
                  background: theme.colors.error.lighter
                },
                color: theme.palette.error.main
              }}
              color="inherit"
              size="small"
              onClick={() => setOpenDelete(true)}
            >
              <DeleteTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      {openDelete && (
        <DeleteComicsDialog
          open={openDelete}
          setOpen={setOpenDelete}
          onAction={handleRemoveItem}
          loading={loadingRemove}
        />
      )}
    </React.Fragment>
  );
};

export default ComicItem;
