import React, { useEffect, useState } from 'react';
import { useAccountStore } from '../../store';
import useProfileApi from 'src/hooks/useProfileApi';
import { useAccountDetail } from '../store';
import { Grid } from '@mui/material';
import ProfileItem from './ProfileItem';

const ManageProfile = () => {
  const { getProfileListsByUserId } = useProfileApi();
  const { account } = useAccountStore();
  const { profiles, onChangeProfiles } = useAccountDetail();
  const [loading, setLoading] = useState<boolean>(false);

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
        <>abc</>
      ) : (
        <Grid container spacing={3} alignItems="center">
          {profiles.map((item) => (
            <Grid item xs={12} key={item.id}>
              <ProfileItem profile={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};

export default ManageProfile;
