import { useCallback, useState } from 'react';
import { Profile, User } from 'src/types/interfaces/User';
import { useBetween } from 'use-between';

export enum EAccountTabs {
  SUMMARY = 'summary',
  EDIT = 'edit_infomation',
  MANAGE_PROFILE = 'manage_profile'
}

function init() {
  const [tabs, setTabs] = useState<EAccountTabs>(EAccountTabs.SUMMARY);
  const onChangeTabs = useCallback((value: EAccountTabs) => setTabs(value), []);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const onChangeProfiles = useCallback(
    (value: Profile[]) => setProfiles(value),
    []
  );

  return {
    tabs,
    onChangeTabs,
    profiles,
    onChangeProfiles
  };
}

export const useAccountDetail = () => useBetween(init);
