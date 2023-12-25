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
import { IMovie } from 'src/types/interfaces/Movie';
import { useMovieStore } from './store';
import { formatDate } from 'src/utils/Helper';
import { useNavigate } from 'react-router';
import { Pathname } from 'src/routes/path';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Label from 'src/components/Label';
import DeleteMoviesDialog from './DeleteMoviesDialog';
import useMovieApi from 'src/hooks/useMovieApi';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';

interface Props {
  movie: IMovie;
}

const MovieItem = ({ movie }: Props) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    selected,
    onChangeSelected,
    movies,
    onChangeMovies,
    onChangeListMetadata,
    listMetadata
  } = useMovieStore();
  const { deleteMovies } = useMovieApi();

  const getLabelState = (movie: IMovie) => {
    const { state } = movie;
    switch (state) {
      case 1:
        return {
          color: 'success',
          text: 'Đang hoạt động'
        };
      case 0:
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
    deleteMovies([movie.id])
      .then((response) => {
        SuccessSnackbar('Xóa phim thành công!');
        onChangeMovies([...movies.filter((item) => item.id !== movie.id)]);
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
            checked={selected.includes(movie.id)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.checked) {
                onChangeSelected([...selected, movie.id]);
              } else {
                onChangeSelected([
                  ...selected.filter((item) => item !== movie.id)
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
            {movie.title}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            {formatDate(new Date(movie.publishDate))}
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
            {`${movie?.duration || 'N/A'} phút`}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2" color="text.secondary" noWrap>
            {`${movie.views} lượt xem`}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {`${movie.likes} lượt thích`}
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
            {`${movie.golds} vàng`}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Label color={getLabelState(movie).color as any}>
            {getLabelState(movie).text}
          </Label>
        </TableCell>
        <TableCell align="right">
          <Tooltip title="Cập nhật thông tin phim" arrow placement="top">
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
                navigate(`/${Pathname.movies}/${movie.id}`);
              }}
            >
              <EditTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa phim" arrow placement="top">
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
        <DeleteMoviesDialog
          open={openDelete}
          setOpen={setOpenDelete}
          onAction={handleRemoveItem}
          loading={loadingRemove}
        />
      )}
    </React.Fragment>
  );
};

export default MovieItem;
