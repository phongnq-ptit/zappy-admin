import React, { useState } from 'react';
import { useAccountStore } from './store';
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { UserRole } from 'src/types/enums/UserRole';

const FilterAccount = () => {
  const { queryParams, onChangeQueryParams, loading } = useAccountStore();
  const [searchStr, setSearchStr] = useState<string>(
    queryParams.search === undefined ? '' : queryParams.search
  );
  const [isActive, setIsActive] = useState<string>('0');

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

  const handleChangeActive = (event: SelectChangeEvent) => {
    const choosed = event.target.value;
    setIsActive(choosed);

    if (choosed == '0') {
      onChangeQueryParams({
        ...queryParams,
        page: 1,
        filter: JSON.stringify({ role: UserRole.PARENTS })
      });
      return;
    }

    if (choosed == '1') {
      onChangeQueryParams({
        ...queryParams,
        page: 1,
        filter: JSON.stringify({ isActive: 'true' })
      });
      return;
    }

    if (choosed == '2') {
      onChangeQueryParams({
        ...queryParams,
        page: 1,
        filter: JSON.stringify({ isActive: 'false' })
      });
      return;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Grid container spacing={1} justifyContent="space-between" width="100%">
          <Grid item xs={8}>
            <FormControl variant="outlined" sx={{ width: '100%' }}>
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
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Trạng thái</InputLabel>
              <Select
                labelId="select-label"
                value={isActive}
                onChange={handleChangeActive}
                label="Trạng thái"
                fullWidth
              >
                <MenuItem value={0}>Tất cả</MenuItem>
                <MenuItem value={1}>Đã kích hoạt</MenuItem>
                <MenuItem value={2}>Chưa kích hoạt</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
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
