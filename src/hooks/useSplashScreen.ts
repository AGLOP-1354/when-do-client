import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { initializeKakaoSDK } from '@react-native-kakao/core';

import useTodayTodo from './useTodayTodo.ts';
import useGoals from './useGoals.ts';
import useRoutine from './useRoutine.ts';

const useSplashScreen = () => {
  const { isFetchTodayTodoListLoading } = useTodayTodo();
  const { isFetchGoalListLoading } = useGoals();
  const { isFetchRoutineListLoading } = useRoutine();

  const initKakaoSdk = async () => {
    await initializeKakaoSDK('397e1396e2013f6b77f95cf77c1eb9c2');
  };

  useEffect(() => {
    if (isFetchTodayTodoListLoading || isFetchGoalListLoading || isFetchRoutineListLoading) return;

    void initKakaoSdk();
    SplashScreen.hide();
  }, [isFetchTodayTodoListLoading, isFetchGoalListLoading, isFetchRoutineListLoading]);

  return {
  };
};

export default useSplashScreen;
