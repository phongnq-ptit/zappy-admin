import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { BootstrapDialog } from 'src/components/Dialog/BootstapDialog';
import { IChapter } from 'src/types/interfaces/Comic';
import CloseIcon from '@mui/icons-material/Close';
import { useComicStore } from '../../store';
import { MovieState } from 'src/types/enums/MovieState';
import { LoadingButton } from '@mui/lab';
import useChapterApi from 'src/hooks/useChapterApi';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';
import { useChapterStore } from '../store';

interface Props {
  chapter: IChapter;
  open: boolean;
  setOpen: Function;
}

const PreviewChapter = ({ chapter, open, setOpen }: Props) => {
  const theme = useTheme();
  const [loadingBtn, setLoading] = useState(false);
  const { updateChapter } = useChapterApi();
  const { chapters, onChangeChapters } = useChapterStore();
  const { comic } = useComicStore();

  const update = () => {
    setLoading(true);
    updateChapter(chapter.id, MovieState.InActive)
      .then((response) => {
        if (response.success) {
          SuccessSnackbar('Công khai thành công tập truyện!');
          onChangeChapters(
            chapters.map((item) => {
              if (item.id === chapter.id) {
                return { ...chapter, state: MovieState.InActive };
              }
              return item;
            })
          );
        }
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        fullWidth={true}
        scroll="paper"
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            fontSize: '1.2rem',
            fontWeight: 700,
            color: theme.colors.secondary.dark
          }}
          id="customized-dialog-title"
        >
          {`Tập ${chapter.chap} - ${comic.title}`}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 9,
            top: 9,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ width: '100%', display: 'grid', placeItems: 'center' }}>
            {chapter.imageUrl.map((item, index) => (
              <Box component="img" src={item.url} key={'img-chapter' + index} />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          {chapter.state === MovieState.Active && (
            <LoadingButton
              loading={loadingBtn}
              variant="outlined"
              onClick={update}
              color={loadingBtn ? 'secondary' : 'primary'}
              autoFocus
            >
              <span>Công khai tập</span>
            </LoadingButton>
          )}
          <Button
            variant="outlined"
            color="inherit"
            autoFocus
            onClick={handleClose}
          >
            Đóng
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default PreviewChapter;
