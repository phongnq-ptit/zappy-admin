import { useCallback, useState } from 'react';
import { UserRole } from 'src/types/enums/UserRole';
import {
  ListMetadata,
  QueryParams,
  defaultListMetadata
} from 'src/types/interfaces/Base';
import { User } from 'src/types/interfaces/User';
import { useBetween } from 'use-between';

function init() {
  const [accounts, setAccounts] = useState<User[]>([]);
  const onChangeAccounts = useCallback(
    (value: User[]) => setAccounts(value),
    []
  );

  const [listMetadata, setListMetadata] =
    useState<ListMetadata>(defaultListMetadata);
  const onChangeListMetadata = useCallback(
    (value: ListMetadata) => setListMetadata(value),
    []
  );

  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: 10,
    page: 1,
    search: undefined,
    filter: undefined
  });
  const onChangeQueryParams = useCallback(
    (value: QueryParams) => setQueryParams(value),
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQueryParams({
        ...queryParams,
        limit: Number(event.target.value),
        page: 1
      });
    },
    []
  );

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setQueryParams({ ...queryParams, page: newPage + 1 });
    },
    []
  );

  const [loading, setLoading] = useState(false);
  const onChangeLoading = useCallback(
    (value: boolean) => setLoading(value),
    []
  );

  const accountDefault: User = {
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    username: '',
    email: '',
    address: '',
    phone: '',
    isActive: false,
    golds: 0,
    role: UserRole.PARENTS,
    provider: 1,
    profiles: []
  };
  const [account, setAccount] = useState<User>(accountDefault);
  const onChangeAccount = useCallback((value: User) => setAccount(value), []);

  return {
    accounts,
    onChangeAccounts,
    listMetadata,
    onChangeListMetadata,
    queryParams,
    onChangeQueryParams,
    loading,
    onChangeLoading,
    handleChangePage,
    handleChangeRowsPerPage,
    accountDefault,
    account,
    onChangeAccount
  };
}

export const useAccountStore = () => useBetween(init);
