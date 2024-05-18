import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import dayjs from 'dayjs';

import useTodayTodo from './useTodayTodo.ts';
import useGoals from './useGoals.ts';

const useSplashScreen = () => {
  const { initTempTodayTodo } = useTodayTodo();
  useGoals();

  useEffect(() => {
    const today = dayjs();
    void initTempTodayTodo(today);

    SplashScreen.hide();
  }, [initTempTodayTodo]);

  return {
  };
};

export default useSplashScreen;
