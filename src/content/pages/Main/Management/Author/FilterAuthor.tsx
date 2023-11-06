import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import React, { useState } from 'react';
import { QueryParams } from 'src/types/interfaces/Base';
import SearchIcon from '@mui/icons-material/Search';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';

interface Props {
  query: QueryParams;
  setQuery: (query: QueryParams) => void;
}

const FilterAuthor = (props: Props) => {
  const [searchStr, setSearchStr] = useState<string>(
    props.query.search === undefined ? '' : props.query.search
  );

  const onChangeSearch = (event: React.ChangeEvent) => {
    setSearchStr((event.target as HTMLInputElement).value);
  };

  const handleClear = () => {
    setSearchStr('');
    if (props.query.search !== undefined)
      props.setQuery({ ...props.query, page: 1, search: undefined });
  };

  const handleSearch = () => {
    props.setQuery({
      ...props.query,
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
            placeholder="Tìm kiếm theo tên tác giả, mô tả"
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
      {props.query.search && (
        <Grid item xs={12}>
          <b>Kết quả tìm kiếm của: </b> <i>{props.query.search}</i>
        </Grid>
      )}
    </Grid>
  );
};

export default FilterAuthor;
