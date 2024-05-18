import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import uuid from 'react-native-uuid';

import { accountAtom } from '../atoms/account.ts';
import useFetch from './useFetch.ts';
import { useNavigation } from '@react-navigation/native';

type AccountInfo = {
  socialId?: string;
  name: string;
  email?: string;
  description?: string;
  profileImage?: string;
}

type AccountInfoResponse = {
  data: {
    __v: number;
    _id: string;
    userId: string;
    name: string;
    email: string;
    profileImage?: string;
    updatedAt: Date;
    createdAt: Date;
    deletedAt?: Date;
  }
}

type CreateAccountResponse = {
  data: {
    __v: number;
    _id: string;
    userId: string;
    name: string;
    email: string;
    profileImage?: string;
    description?: string;
    updatedAt: Date;
    createdAt: Date;
    deletedAt?: Date;
  }
}

const USER_ID = 'userId';

const useAccount = () => {
  const accountInfo = useRecoilValue(accountAtom);
  const setAccountInfo = useSetRecoilState(accountAtom);
  const { navigate } = useNavigation();

  const { kyFetch } = useFetch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const createTempAccount = useMutation({
    mutationFn: async () => {
      try {
        const userId = uuid.v4() as string;
        const result = await kyFetch({
          method: 'POST',
          url: '/account/create',
          data: {
            userId,
            name: 'guest',
            email: 'XXX@when-do.io',
            profileImage: undefined,
          },
        });

        await AsyncStorage.setItem(USER_ID, userId);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      setIsLoggedIn(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      navigate('home');
    },
  });

  const createAccount = useMutation({
    mutationFn: async ({ socialId, name, email, profileImage }: AccountInfo) => {
      try {
        const userId = uuid.v4() as string;
        const result = await kyFetch({
          method: 'POST',
          url: '/account/create',
          data: {
            userId,
            socialId,
            name,
            email,
            profileImage,
          },
        }) as CreateAccountResponse;

        await AsyncStorage.setItem(USER_ID, result.data.userId);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      setIsLoggedIn(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      navigate('home');
    },
  });

  const updateAccount = useMutation({
    mutationFn: async ({
     socialId,
     name,
     email,
     description,
     profileImage,
   }: AccountInfo) => {
      try {
        const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
        const result = await kyFetch({
          method: 'POST',
          url: '/account/update',
          data: {
            userId: asyncStoragePersonId,
            socialId,
            name,
            email,
            description,
            profileImage,
          },
        }) as CreateAccountResponse;

        await AsyncStorage.setItem(USER_ID, result.data.userId);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    data: accountInfoFromDatabase = {},
    isLoading: isFetchAccountInfoLoading,
  } = useQuery({
    queryKey: ['account-info', isLoggedIn],
    queryFn: async () => {
      const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
      if (!asyncStoragePersonId) {
        return {};
      }

      try {
        const result = await kyFetch({
          method: 'GET',
          url: `/account/get/${asyncStoragePersonId}`,
        }) as AccountInfoResponse;

        if (result && result.data) {
          setAccountInfo(result.data);
          setIsLoggedIn(true);
        }

        return result;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const deleteAccount = useMutation({
    mutationFn: async () => {
      const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);

      try {
        await kyFetch({
          method: 'POST',
          url: '/account/logout',
          data: {
            userId: asyncStoragePersonId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: async () => {
      await AsyncStorage.removeItem(USER_ID);
      setIsLoggedIn(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      navigate('home');
    }
  });

  const logout = async () => {
    await AsyncStorage.removeItem(USER_ID);
    setIsLoggedIn(false);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    navigate('home');
  };

  return {
    isLoggedIn,
    createAccount,
    accountInfo,
    isFetchAccountInfoLoading,
    accountInfoFromDatabase,
    createTempAccount,
    updateAccount,
    logout,
    deleteAccount,
  };
};

export default useAccount;
