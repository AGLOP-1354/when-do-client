import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import useTodayTodo from './useTodayTodo.ts';
import useGoals from './useGoals.ts';
import useRoutine from './useRoutine.ts';

const useSplashScreen = () => {
  const { isFetchTodayTodoListLoading } = useTodayTodo();
  const { isFetchGoalListLoading } = useGoals();
  const { isFetchRoutineListLoading } = useRoutine();

  useEffect(() => {
    if (isFetchTodayTodoListLoading || isFetchGoalListLoading || isFetchRoutineListLoading) return;

    SplashScreen.hide();
  }, [isFetchTodayTodoListLoading, isFetchGoalListLoading, isFetchRoutineListLoading]);

  return {
  };
};

export default useSplashScreen;
