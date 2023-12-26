import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

function AccountBalance() {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: [
      'Người Dùng',
      'Truyện',
      'Nhạc',
      'Phim',
      'Thể Loại',
      'Tác Giả',
      'Gói Ưu Đãi'
    ],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const arr = [4, 6, 11, 4, 18, 13, 5];
  const chartSeries = [12, 23, 10, 8, 15, 20, 12];

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12}>
          <Typography
            sx={{
              pb: 3,
              pl: 3,
              pt: 3
            }}
            variant="h4"
          >
            Biểu Đồ Tỷ Lệ Tài Nguyên Hiện Tại
          </Typography>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          item
          xs={6}
        >
          <Box>
            <Chart
              height={250}
              options={chartOptions}
              series={chartSeries}
              type="donut"
            />
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          item
          xs={6}
        >
          <Grid container spacing={2} p={2} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h5" noWrap>
                Người Dùng
              </Typography>
              <Typography variant="subtitle1" noWrap>
                12%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" noWrap>
                Bộ Phim
              </Typography>
              <Typography variant="subtitle1" noWrap>
                8%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" noWrap>
                Bản Nhạc
              </Typography>
              <Typography variant="subtitle1" noWrap>
                10%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" noWrap>
                Bộ Truyện
              </Typography>
              <Typography variant="subtitle1" noWrap>
                23%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" noWrap>
                Thể Loại
              </Typography>
              <Typography variant="subtitle1" noWrap>
                15%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" noWrap>
                Tác Giả
              </Typography>
              <Typography variant="subtitle1" noWrap>
                20%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" noWrap>
                Gói Ưu Đãi
              </Typography>
              <Typography variant="subtitle1" noWrap>
                12%
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          item
          xs={6}
        >
          <Box p={2}></Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
