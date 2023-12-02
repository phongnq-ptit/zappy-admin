import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';
import { useMusicStore } from './store';
import useMusicApi from 'src/hooks/useMusicApi';
import DeleteMusicsDialog from './DeleteMusicsDialog';

const FilterMusic = () => {
  const {
    queryParams,
    onChangeQueryParams,
    loading,
    selected,
    musics,
    onChangeMusics,
    onChangeSelected,
    listMetadata,
    onChangeListMetadata
  } = useMusicStore();
  const [searchStr, setSearchStr] = useState<string>(
    queryParams.search === undefined ? '' : queryParams.search
  );
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
  const { deleteMusics } = useMusicApi();

  const onChangeSearch = (event: React.ChangeEvent) => {
    setSearchStr((event.target as HTMLInputElement).value);
  };

  const handleClear = () => {
    setSearchStr('');
    if (queryParams.search !== undefined)
      onChangeQueryParams({ ...queryParams, page: 1, search: undefined });
  };

  const handleSearch = () => {
    onChangeQueryParams({
      ...queryParams,
      page: 1,
      search: !searchStr ? undefined : searchStr
    });
  };

  const handleRemoveItemLists = () => {
    setLoadingRemove(true);
    deleteMusics(selected)
      .then((response) => {
        SuccessSnackbar('Xóa nhạc thành công!');
        onChangeMusics([
          ...musics.filter((item) => !selected.includes(item.id))
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Tìm kiếm
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              value={searchStr}
              endAdornment={
                <>
                  {searchStr && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClear}
                        edge="end"
                        disabled={loading}
                        size="small"
                      >
                        <ClearTwoToneIcon />
                      </IconButton>
                    </InputAdornment>
                  )}
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleSearch}
                      edge="end"
                      disabled={loading}
                      size="medium"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                </>
              }
              label="Tìm kiếm"
              onChange={onChangeSearch}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          {selected.length !== 0 && (
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
        {queryParams.search && (
          <Grid item xs={12}>
            <b>Kết quả tìm kiếm của: </b> <i>{queryParams.search}</i>
          </Grid>
        )}
      </Grid>
      {openDelete && (
        <DeleteMusicsDialog
          open={openDelete}
          setOpen={setOpenDelete}
          onAction={handleRemoveItemLists}
          loading={loadingRemove}
        />
      )}
    </React.Fragment>
  );
};

export default FilterMusic;
