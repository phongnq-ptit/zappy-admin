import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BootstrapDialog } from 'src/components/Dialog/BootstapDialog';
import { ApiListResponse, QueryParams } from 'src/types/interfaces/Base';
import CloseIcon from '@mui/icons-material/Close';
import { Genre } from 'src/types/interfaces/Genre';
import { Author } from 'src/types/interfaces/Author';
import useGenreApi from 'src/hooks/useGenreApi';
import useAuthorApi from 'src/hooks/useAuthorApi';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import _ from 'lodash';

interface Props {
  queryParams: QueryParams;
  setQueryParams: Function;
  open: boolean;
  setOpen: Function;
  type: 'movie' | 'music' | 'comic';
  authors: Author[];
  genres: Genre[];
}

const MoreFilter = ({
  queryParams,
  setQueryParams,
  open,
  setOpen,
  type,
  authors,
  genres
}: Props) => {
  const getQuery = (key: string) => {
    return queryParams?.filter ? JSON.parse(queryParams.filter)[key] : '';
  };
  const theme = useTheme();
  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const [chooseAuthor, setChooseAuthor] = useState<number[]>(
    getValueQuery(getQuery('authors.id'))
  );
  const [chooseGenre, setChooseGenre] = useState<number[]>(
    getValueQuery(getQuery('genres.id'))
  );
  const getStateInQuery = (str: string) => {
    if (!str || typeof str !== 'string') {
      return 'all';
    }
    if (str === '0') return 'pending';
    if (str === '1') return 'public';
    return 'all';
  };
  const [status, setStatus] = useState<string>(
    getStateInQuery(getQuery('state'))
  );
  const [numberBtw, setNumberBtw] = useState<number[]>(
    getValueQuery(getQuery('golds'), [0, 1000])
  );

  const { getGenreComic, getGenreMovie, getGenreMusic } = useGenreApi();
  const { getAuthorComic, getAuthorMovie, getAuthorMusic } = useAuthorApi();

  function apiGenre(): Promise<ApiListResponse<Genre[]>> {
    if (type === 'movie') return getGenreMovie();
    if (type === 'comic') return getGenreComic();
    return getGenreMusic();
  }

  function apiAuthor(): Promise<ApiListResponse<Author[]>> {
    if (type === 'movie') return getAuthorMovie();
    if (type === 'comic') return getAuthorComic();
    return getAuthorMusic();
  }

  function clearFilter() {
    setChooseAuthor([]);
    setChooseGenre([]);
    setStatus('all');
    setNumberBtw([0, 1000]);
  }

  const marks = [
    {
      value: 0,
      label: '0 vàng'
    },
    {
      value: 1000,
      label: '1000 vàng'
    }
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    let _filter: any = {};

    if (chooseAuthor.length > 0)
      _filter = { ..._filter, 'authors.id': convert$in(chooseAuthor) };

    if (chooseGenre.length > 0)
      _filter = { ..._filter, 'genres.id': convert$in(chooseGenre) };

    if (status !== 'all') _filter = { ..._filter, state: getFilterState() };

    if (numberBtw[0] !== 0 || numberBtw[1] !== 1000)
      _filter = { ..._filter, golds: `$btw:${numberBtw[0]}, ${numberBtw[1]}` };

    if (Object.keys(_filter).length !== 0) {
      setQueryParams({
        ...queryParams,
        page: 1,
        filter: JSON.stringify(_filter)
      });
    } else {
      delete queryParams.filter;
      setQueryParams({
        ...queryParams
      });
    }

    setOpen(false); // close
  };

  const getFilterState = () => {
    if (status === 'all') return undefined;
    if (status === 'public') return '1';
    return '0';
  };

  const convert$in = (arr: number[]) => {
    if (arr.length > 0) return `$in:` + arr.join(',');
    return undefined;
  };

  function getValueQuery(inputString: string, defaultValue: number[] = []) {
    if (!inputString || typeof inputString !== 'string') {
      return defaultValue;
    }
    const numberArray = inputString.match(/\d+/g);
    return numberArray ? numberArray.map(Number) : defaultValue;
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth={true}
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
        Bộ lọc nâng cao
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={authors}
              disableCloseOnSelect
              value={authors.filter((item) => chooseAuthor.includes(item.id))}
              noOptionsText={'Không có kết quả phù hợp'}
              onChange={(event, newValue: Author[]) =>
                setChooseAuthor(newValue.map((item) => item.id))
              }
              getOptionLabel={(option: Author) => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Tác Giả" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={genres}
              disableCloseOnSelect
              value={genres.filter((item) => chooseGenre.includes(item.id))}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              noOptionsText={'Không có kết quả phù hợp'}
              onChange={(event, newValue: Genre[]) =>
                setChooseGenre(newValue.map((item) => item.id))
              }
              getOptionLabel={(option: Genre) => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Thể Loại" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="select-label">Trạng Thái</InputLabel>
              <Select
                labelId="select-label"
                value={status}
                onChange={(event: SelectChangeEvent) => {
                  setStatus(event.target.value as string);
                }}
                label="Trạng Thái"
              >
                <MenuItem value={'all'}>Tất cả</MenuItem>
                <MenuItem value={'public'}>Đang hoạt động (Công khai)</MenuItem>
                <MenuItem value={'pending'}>Chờ (Chưa công khai)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Giá vàng: {`${numberBtw[0]} vàng - ${numberBtw[1]} vàng`}
            </Typography>
            <Box sx={{ m: '0 auto', width: '80%', pt: 1 }}>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={numberBtw}
                onChange={(event: Event, newValue: number | number[]) => {
                  setNumberBtw(newValue as number[]);
                }}
                valueLabelDisplay="auto"
                max={1000}
                min={0}
                step={10}
                marks={marks}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Button
              variant="outlined"
              color="inherit"
              autoFocus
              onClick={clearFilter}
              startIcon={<ClearIcon />}
            >
              Làm mới
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              <span>Áp dụng</span>
            </Button>
            <Button
              sx={{ ml: 1 }}
              variant="outlined"
              color="inherit"
              autoFocus
              onClick={handleClose}
            >
              Đóng
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default MoreFilter;
