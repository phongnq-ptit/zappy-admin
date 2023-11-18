import React, { useEffect, useState } from 'react';
import { useAccountStore } from '../../store';
import useProfileApi from 'src/hooks/useProfileApi';
import { useAccountDetail } from '../store';
import { Button, Grid } from '@mui/material';
import ProfileItem from './ProfileItem';
import SekeletonProfiles from './SekeletonProfiles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddProfileDialog from './AddProfileDialog';

const ManageProfile = () => {
  const { getProfileListsByUserId } = useProfileApi();
  const { account } = useAccountStore();
  const { profiles, onChangeProfiles } = useAccountDetail();
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddProfile, setIsAddProfile] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getProfileListsByUserId(account.id)
      .then((response) => {
        onChangeProfiles(response.data);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 750);
      });
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <SekeletonProfiles />
      ) : (
        <>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<AddOutlinedIcon />}
                sx={{ float: 'right' }}
                onClick={() => setIsAddProfile(true)}
              >
                Thêm Hồ Sơ Mới
              </Button>
            </Grid>
            {profiles.map((item) => (
              <Grid item xs={12} key={item.id}>
                <ProfileItem profile={item} />
              </Grid>
            ))}
          </Grid>
          {isAddProfile && (
            <AddProfileDialog open={isAddProfile} setOpen={setIsAddProfile} />
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default ManageProfile;
