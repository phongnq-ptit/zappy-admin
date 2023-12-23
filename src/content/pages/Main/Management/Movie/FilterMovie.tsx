import React, { useEffect, useState } from 'react';
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
import useMovieApi from 'src/hooks/useMovieApi';
import DeleteMoviesDialog from './DeleteMoviesDialog';
import { useMovieStore } from './store';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreFilter from 'src/components/Common/Media/MoreFilter';
import useGenreApi from 'src/hooks/useGenreApi';
import useAuthorApi from 'src/hooks/useAuthorApi';
import { Genre } from 'src/types/interfaces/Genre';
import { Author } from 'src/types/interfaces/Author';

const FilterMovie = () => {
  const {
    queryParams,
    onChangeQueryParams,
    loading,
    selected,
    movies,
    onChangeMovies,
    onChangeSelected,
    listMetadata,
    onChangeListMetadata
  } = useMovieStore();
  const [searchStr, setSearchStr] = useState<string>(
    queryParams.search === undefined ? '' : queryParams.search
  );
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
  const { deleteMovies } = useMovieApi();
  const [isMore, setIsMore] = useState(false);

  const [cate, setCate] = useState<Genre[]>([]);
  const [author, setAuthor] = useState<Author[]>([]);
  const { getGenreMovie } = useGenreApi();
  const { getAuthorMovie } = useAuthorApi();

  useEffect(() => {
    Promise.all([
      getAuthorMovie().then((response) => {
        setAuthor(response.data.results);
      }),
      getGenreMovie().then((response) => {
        setCate(response.data.results);
      })
    ]).finally(() => {
      // tbd
    });
  }, []);

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
    deleteMovies(selected)
      .then((response) => {
        SuccessSnackbar('Xóa phim thành công!');
        onChangeMovies([
          ...movies.filter((item) => !selected.includes(item.id))
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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
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
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => setIsMore(true)}
                startIcon={<FilterListIcon />}
                disabled={loading}
              >
                Lọc Nâng Cao
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
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
        <DeleteMoviesDialog
          open={openDelete}
          setOpen={setOpenDelete}
          onAction={handleRemoveItemLists}
          loading={loadingRemove}
        />
      )}
      {isMore && (
        <MoreFilter
          open={isMore}
          setOpen={setIsMore}
          queryParams={queryParams}
          setQueryParams={onChangeQueryParams}
          type="movie"
          authors={author}
          genres={cate}
        />
      )}
    </React.Fragment>
  );
};

export default FilterMovie;
