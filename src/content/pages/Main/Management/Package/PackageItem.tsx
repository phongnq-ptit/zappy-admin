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
import { IPackage } from 'src/types/interfaces/Package';
import { usePackageStore } from './store';
import { formatDateTime, formatterVND } from 'src/utils/Helper';
import DeletePackageDialog from './DeletePackageDialog';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Label from 'src/components/Label';
import usePackageApi from 'src/hooks/usePackageApi';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';
import { useNavigate } from 'react-router';
import { Pathname } from 'src/routes/path';

interface Props {
  _package: IPackage;
}

const PackageItem = ({ _package }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    selected,
    onChangeSelected,
    packages,
    onChangePackages,
    onChangeListMetadata,
    listMetadata
  } = usePackageStore();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
  const { deletePackages } = usePackageApi();

  const handleRemoveItem = () => {
    setLoadingRemove(true);
    deletePackages([_package.id])
      .then((response) => {
        SuccessSnackbar('Xóa gói ưu đãi thành công!');
        onChangePackages([
          ...packages.filter((item) => item.id !== _package.id)
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

  const getLabelState = (_package: IPackage) => {
    const { state, endDate } = _package;
    const isExpired = new Date(endDate).getTime() < new Date().getTime();
    if (isExpired)
      return {
        color: 'error',
        text: 'Đã hết hạn'
      };
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

  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell align="center">
          <Checkbox
            checked={selected.includes(_package.id)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.checked) {
                onChangeSelected([...selected, _package.id]);
              } else {
                onChangeSelected([
                  ...selected.filter((item) => item !== _package.id)
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
            {_package.name}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography
            variant="body1"
            color="text.primary"
            gutterBottom
            noWrap
            sx={
              _package.discount !== 0 && {
                textDecoration: 'line-through',
                fontWeight: '400'
              }
            }
          >
            {formatterVND.format(_package.price)}
          </Typography>
          {_package.discount !== 0 && (
            <Typography
              variant="body1"
              color="text.primary"
              gutterBottom
              noWrap
              sx={{ color: theme.colors.error.main }}
            >
              {formatterVND.format(
                _package.price * (1 - _package.discount / 100)
              )}
            </Typography>
          )}
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2" color="text.secondary" noWrap>
            {`${_package.golds} Vàng`}
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
            {`${_package.discount}%`}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body2" color="text.secondary" noWrap>
            {formatDateTime(_package.startDate)}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {formatDateTime(_package.endDate)}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Label color={getLabelState(_package).color as any}>
            {getLabelState(_package).text}
          </Label>
        </TableCell>
        <TableCell>
          <Tooltip title="Cập nhật thông tin gói ưu đãi" arrow placement="top">
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
                navigate(`/${Pathname.package}/${_package.id}`);
              }}
            >
              <EditTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa gói ưu đãi" arrow placement="top">
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
        <DeletePackageDialog
          open={openDelete}
          setOpen={setOpenDelete}
          onAction={handleRemoveItem}
          loading={loadingRemove}
        />
      )}
    </React.Fragment>
  );
};

export default PackageItem;
