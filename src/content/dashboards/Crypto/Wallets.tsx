import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  styled
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import FaceIcon from '@mui/icons-material/Face';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
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

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(['all'])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

function Wallets() {
  const data = [
    {
      icon: <PersonIcon />,
      title: 'Người Dùng',
      value: 4
    },
    {
      title: 'Hồ Sơ',
      value: 3,
      icon: <AccountBoxIcon />
    },
    {
      title: 'Truyện',
      value: 6,
      icon: <AutoStoriesIcon />
    },
    {
      title: 'Tập Truyện',
      value: 20,
      icon: <StickyNote2Icon />
    },
    {
      title: 'Phim',
      value: 4,
      icon: <LiveTvIcon />
    },
    {
      title: 'Nhạc',
      value: 11,
      icon: <MusicNoteIcon />
    },
    {
      title: 'Tác Giả',
      value: 13,
      icon: <FaceIcon />
    },
    {
      title: 'Thể Loại',
      value: 18,
      icon: <CategoryIcon />
    },
    {
      title: 'Gói Ưu Đãi',
      value: 5,
      icon: <LoyaltyIcon />
    }
  ];

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">Số Lượng Tài Nguyên</Typography>
      </Box>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid xs={12} sm={6} md={3} item key={item.value}>
            <Card
              sx={{
                px: 1
              }}
            >
              <CardContent>
                <AvatarWrapper sx={{ color: 'black' }}>
                  {item.icon}
                </AvatarWrapper>
                <Typography variant="h5" noWrap>
                  {item.title}
                </Typography>
                <Box
                  sx={{
                    pt: 3
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography variant="subtitle1">Số lượng:</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h1" gutterBottom noWrap>
                        {item.value}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Wallets;
