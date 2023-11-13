import React, { useState } from 'react';
import { useAccountStore } from '../store';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Link,
  Typography
} from '@mui/material';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { makeStyles } from '@mui/styles';
import Label from 'src/components/Label';
import { format } from 'date-fns';
import { EAccountTabs, useAccountDetail } from './store';
import SummaryProfileItem from './SummaryProfileItem';

const useStyles = makeStyles({
  titleColor: {
    color: 'rgba(0,0,0,0.5)',
    textTransform: 'capitalize',
    marginBottom: '4px !important'
  },
  fontS1: {
    fontSize: '1rem'
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline !important'
  }
});

const Summary = () => {
  const classes = useStyles();
  const { account } = useAccountStore();
  const { onChangeTabs } = useAccountDetail();

  const [expanded, setExpanded] = useState<string[]>(['info', 'profile']);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      if (newExpanded) {
        setExpanded([...expanded, panel]);
      } else {
        setExpanded(expanded.filter((item) => item !== panel));
      }
    };

  const handleClickLink = (accordition: string) => {
    if (accordition === 'info') {
      onChangeTabs(EAccountTabs.EDIT);
    } else {
      onChangeTabs(EAccountTabs.MANAGE_PROFILE);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Accordion
          expanded={expanded.includes('info')}
          onChange={handleChange('info')}
        >
          <AccordionSummary
            expandIcon={
              expanded.includes('info') ? (
                <UnfoldLessIcon />
              ) : (
                <UnfoldMoreIcon />
              )
            }
            aria-controls="panel1bh-content"
            sx={{
              borderBottom:
                expanded.includes('info') && '1px solid rgba(0,0,0,0.1)',
              borderRadius: '5px 5px 0px 0px'
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textTransform: 'capitalize',
                px: 1
              }}
            >
              Thông tin cơ bản
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} px={1} pt={2}>
              <Grid item xs={4}>
                <Typography variant="h5" className={classes.titleColor}>
                  Tên người dùng:
                </Typography>
                <Typography variant="body1" className={classes.fontS1}>
                  {account.username}
                </Typography>
              </Grid>
              <Grid item xs={4} p={1}>
                <Typography variant="h5" className={classes.titleColor}>
                  Email:
                </Typography>
                <Typography variant="body1" className={classes.fontS1}>
                  {account.email}
                </Typography>
              </Grid>
              <Grid item xs={4} p={1}>
                <Typography variant="h5" className={classes.titleColor}>
                  Số điện thoại:
                </Typography>
                <Typography variant="body1" className={classes.fontS1}>
                  {account.phone}
                </Typography>
              </Grid>
              <Grid item xs={4} p={1}>
                <Typography variant="h5" className={classes.titleColor}>
                  Địa chỉ:
                </Typography>
                <Typography variant="body1" className={classes.fontS1}>
                  {account.address}
                </Typography>
              </Grid>
              <Grid item xs={4} p={1}>
                <Typography variant="h5" className={classes.titleColor}>
                  Số vàng hiện có:
                </Typography>
                <Typography variant="body1" className={classes.fontS1}>
                  {account.golds + ' vàng'}
                </Typography>
              </Grid>
              <Grid item xs={4} p={1}>
                <Typography variant="h5" className={classes.titleColor}>
                  Trạng thái tài khoản:
                </Typography>
                <Typography variant="body1" className={classes.fontS1}>
                  <Label color={account.isActive ? 'success' : 'error'}>
                    {account.isActive ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                  </Label>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5" className={classes.titleColor}>
                  Phương thức đăng ký:
                </Typography>
                <Typography variant="body1" className={classes.fontS1}>
                  {account.provider === 1
                    ? 'Qua Hệ Thống'
                    : 'Qua Tài Khoản Google'}
                </Typography>
              </Grid>
              <Grid item xs={4} p={1}>
                <Typography variant="h5" className={classes.titleColor}>
                  Ngày tạo:
                </Typography>
                <Typography variant="body1" className={classes.fontS1}>
                  {format(new Date(account.createdAt), 'HH:mm, dd/MM/yyy')}
                </Typography>
              </Grid>
              <Grid item xs={4} p={1}>
                <Typography variant="h5" className={classes.titleColor}>
                  Ngày cập nhật:
                </Typography>
                <Typography variant="body1" className={classes.fontS1}>
                  {format(new Date(account.createdAt), 'HH:mm, dd/MM/yyy')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link
                  onClick={() => handleClickLink('info')}
                  className={classes.link}
                >
                  Chỉnh sửa thông tin tài khoản
                </Link>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Accordion
          expanded={expanded.includes('profile')}
          onChange={handleChange('profile')}
        >
          <AccordionSummary
            expandIcon={
              expanded.includes('profile') ? (
                <UnfoldLessIcon />
              ) : (
                <UnfoldMoreIcon />
              )
            }
            aria-controls="panel2bh-content"
            sx={{
              borderBottom:
                expanded.includes('profile') && '1px solid rgba(0,0,0,0.1)',
              borderRadius: '5px 5px 0px 0px'
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textTransform: 'capitalize',
                px: 1
              }}
            >
              Hồ sơ liên quan
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} px={1} pt={2}>
              <Grid item xs={12}>
                <Typography variant="h5" className={classes.titleColor}>
                  Số hồ sơ hiện có:
                </Typography>
                <Typography variant="body1" className={classes.fontS1}>
                  {account.profiles.length + ' Hồ sơ'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  {account.profiles.map((item) => (
                    <SummaryProfileItem profile={item} key={item.id} />
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Link
                  onClick={() => handleClickLink('profile')}
                  className={classes.link}
                >
                  Quản lý hồ sơ tài khoản
                </Link>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default Summary;
