import { Avatar, Badge, Box, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Profile } from 'src/types/interfaces/User';
import { getAge } from 'src/utils/Helper';

const useStyles = makeStyles({
  avatar: {
    width: '100px',
    height: '100px',
    boxShadow:
      'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
  },
  name: {
    fontSize: '1rem !important',
    textTransform: 'capitalize',
    fontWeight: '600 !important'
  }
});

interface Props {
  profile: Profile;
}

const SummaryProfileItem = (props: Props) => {
  const classes = useStyles();
  const avatar = props.profile.avatar
    ? props.profile.avatar
    : '/static/images/avatars/ava_zappy.png';
  return (
    <Paper elevation={0} square>
      <Grid
        container
        spacing={2}
        flexDirection="column"
        alignItems="center"
        p={2}
      >
        <Grid item xs={12}>
          <Badge
            badgeContent={props.profile.isLocked && 'Đã khóa'}
            color="error"
            invisible={!props.profile.isLocked}
          >
            <Avatar
              alt={props.profile.nickname}
              src={avatar}
              className={classes.avatar}
              sx={{ width: 160, height: 160 }}
            />
          </Badge>
        </Grid>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography className={classes.name}>
              {props.profile.nickname}
            </Typography>
            <Typography>
              {getAge(new Date(props.profile.birthday)) + ' Tuổi'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SummaryProfileItem;
