import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { initializeKakaoSDK } from '@react-native-kakao/core';

import useTodayTodo from './useTodayTodo.ts';
import useGoals from './useGoals.ts';
import useRoutine from './useRoutine.ts';
import useWidget from './useWidget.ts';
import { supabase } from '../lib/supabase.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID = 'userId';

const useSplashScreen = () => {
  const { isFetchTodayTodoListLoading } = useTodayTodo();
  const { isFetchGoalListLoading } = useGoals();
  const { isFetchRoutineListLoading } = useRoutine();
  useWidget();

  // const getAuth = async () => {
  //   const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
  //   const auth = await supabase
  //     .from('auth')
  //     .select('*')
  //     .eq('userId', asyncStoragePersonId);
  // };

  const initKakaoSdk = async () => {
    await initializeKakaoSDK('686b13e2d48f2fb15632463ac3e0055b');
  };

  useEffect(() => {
    if (isFetchTodayTodoListLoading || isFetchGoalListLoading || isFetchRoutineListLoading) return;

    // void getAuth();
    void initKakaoSdk();
    SplashScreen.hide();
  }, [isFetchTodayTodoListLoading, isFetchGoalListLoading, isFetchRoutineListLoading]);

  return {
  };
};

export default useSplashScreen;
