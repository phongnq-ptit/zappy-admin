import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import React, { useState } from 'react';
import { useGenreStore } from './store';

const FilterGenre = () => {
  const { queryParams, onChangeQueryParams } = useGenreStore();
  const [searchStr, setSearchStr] = useState<string>(
    queryParams.search === undefined ? '' : queryParams.search
  );

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Tìm kiếm
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            placeholder="Tìm kiếm theo tên thể loại"
            value={searchStr}
            endAdornment={
              <>
                {searchStr && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClear}
                      edge="end"
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
      <Grid item xs={6}></Grid>
      {queryParams.search && (
        <Grid item xs={12}>
          <b>Kết quả tìm kiếm của: </b> <i>{queryParams.search}</i>
        </Grid>
      )}
    </Grid>
  );
};

export default FilterGenre;
