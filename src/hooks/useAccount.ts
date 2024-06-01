import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import uuid from 'react-native-uuid';

import { accountAtom } from '../atoms/account.ts';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase.ts';

type AccountInfo = {
  socialId?: string;
  name: string;
  email?: string;
  description?: string;
  profileImage?: string;
}

const USER_ID = 'userId';

const useAccount = () => {
  const accountInfo = useRecoilValue(accountAtom);
  const setAccountInfo = useSetRecoilState(accountAtom);
  const { navigate } = useNavigation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const createTempAccount = useMutation({
    mutationFn: async () => {
      const userId = uuid.v4() as string;
      const { data, error  } = await supabase.from('auth')
        .insert([
          {
            userId,
            name: 'guest',
            email: 'XXX@when-do.io',
            profileImage: undefined,
          }
        ]);

      if (error) {
        console.error(error);
        return;
      }

      await AsyncStorage.setItem(USER_ID, userId);
      return data;
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
      const userId = uuid.v4() as string;
      const { data, error } = await supabase.from('auth')
        .insert([
          {
            userId,
            socialId,
            name,
            email,
            profileImage,
          }
        ]);

      if (error) {
        console.error(error);
        return;
      }

      await AsyncStorage.setItem(USER_ID, userId);
      return data;
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
      const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
      const { data, error } = await supabase.from('auth')
        .update({
          socialId,
          name,
          email,
          description,
          profileImage,
        })
        .eq('userId', asyncStoragePersonId);

      if (error) {
        console.error(error);
        return;
      }

      return data;
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

      const { data, error  } = await supabase.from('auth')
        .select('*').eq('userId', asyncStoragePersonId);

      if (error) {
        console.error(error);
        return;
      }

      if (!data || !data.length) return {};

      setAccountInfo(data[0]);
      setIsLoggedIn(true);
      return data;
    },
  });

  const deleteAccount = useMutation({
    mutationFn: async () => {
      const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);

      await supabase.from('account').update({
        deletedAt: new Date(),
      })
        .eq('userId', asyncStoragePersonId);
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
