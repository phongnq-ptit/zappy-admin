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
import { useNavigate } from 'react-router';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Label from 'src/components/Label';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';
import { useChapterStore } from '../store';
import useChapterApi from 'src/hooks/useChapterApi';
import { IChapter } from 'src/types/interfaces/Comic';
import DeleteChapterDialog from './DeleteChapterDialog';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PreviewChapter from './PreviewChapter';

interface Props {
  chapter: IChapter;
}

const ChapterItem = ({ chapter }: Props) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    selected,
    onChangeSelected,
    chapters,
    onChangeChapters,
    onChangeListMetadata,
    listMetadata
  } = useChapterStore();
  const { deleteChapter } = useChapterApi();

  const getLabelState = (movie: IChapter) => {
    const { state } = movie;
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
    deleteChapter([chapter.id])
      .then((response) => {
        SuccessSnackbar('Xóa tập truyện thành công!');
        onChangeChapters([
          ...chapters.filter((item) => item.id !== chapter.id)
        ]);
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
            checked={selected.includes(chapter.id)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.checked) {
                onChangeSelected([...selected, chapter.id]);
              } else {
                onChangeSelected([
                  ...selected.filter((item) => item !== chapter.id)
                ]);
              }
            }}
          />
        </TableCell>
        <TableCell align="center">
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {chapter.chap}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            {chapter.name}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Label color={getLabelState(chapter).color as any}>
            {getLabelState(chapter).text}
          </Label>
        </TableCell>
        <TableCell align="right">
          <Tooltip title="Xem tập" arrow placement="top">
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
                setOpenPreview(true);
              }}
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa tập" arrow placement="top">
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
        <DeleteChapterDialog
          open={openDelete}
          setOpen={setOpenDelete}
          onAction={handleRemoveItem}
          loading={loadingRemove}
        />
      )}
      {openPreview && (
        <PreviewChapter
          chapter={chapter}
          open={openPreview}
          setOpen={setOpenPreview}
        />
      )}
    </React.Fragment>
  );
};

export default ChapterItem;
