import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { GlobalContext } from 'src/contexts/GlobalContext';

function PageHeader() {
  const { LoginUser } = useContext(GlobalContext);
  const user = {
    name: LoginUser.username,
    avatar: '/static/images/avatars/welcome.png'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Xin chào, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          Chào mừng một ngày làm việc hiệu quả.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
