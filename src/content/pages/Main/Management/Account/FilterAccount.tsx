import React, { useState } from 'react';
import { useAccountStore } from './store';
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

const FilterAccount = () => {
  const { queryParams, onChangeQueryParams, loading } = useAccountStore();
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
      <Grid item xs={6}></Grid>
      {queryParams.search && (
        <Grid item xs={12}>
          <b>Kết quả tìm kiếm của: </b> <i>{queryParams.search}</i>
        </Grid>
      )}
    </Grid>
  );
};

export default FilterAccount;
