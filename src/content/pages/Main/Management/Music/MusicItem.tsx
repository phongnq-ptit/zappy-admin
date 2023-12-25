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
import { IMusic } from 'src/types/interfaces/Music';
import { useMusicStore } from './store';
import useMusicApi from 'src/hooks/useMusicApi';
import DeleteMusicsDialog from './DeleteMusicsDialog';

interface Props {
  music: IMusic;
}

const MusicItem = ({ music }: Props) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    selected,
    onChangeSelected,
    musics,
    onChangeMusics,
    onChangeListMetadata,
    listMetadata
  } = useMusicStore();
  const { deleteMusics } = useMusicApi();

  const getLabelState = (_music: IMusic) => {
    const { state } = _music;
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
    deleteMusics([music.id])
      .then((response) => {
        SuccessSnackbar('Xóa phim thành công!');
        onChangeMusics([...musics.filter((item) => item.id !== music.id)]);
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
            checked={selected.includes(music.id)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.checked) {
                onChangeSelected([...selected, music.id]);
              } else {
                onChangeSelected([
                  ...selected.filter((item) => item !== music.id)
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
            {music.title}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            {formatDate(new Date(music.publishDate))}
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
            {`${music.golds} vàng`}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Label color={getLabelState(music).color as any}>
            {getLabelState(music).text}
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
                navigate(`/${Pathname.musics}/${music.id}`);
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
        <DeleteMusicsDialog
          open={openDelete}
          setOpen={setOpenDelete}
          onAction={handleRemoveItem}
          loading={loadingRemove}
        />
      )}
    </React.Fragment>
  );
};

export default MusicItem;
