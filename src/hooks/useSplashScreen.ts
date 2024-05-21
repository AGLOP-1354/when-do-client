import useTodayTodo from './useTodayTodo.ts';
import useGoals from './useGoals.ts';
import useRoutine from './useRoutine.ts';

const useSplashScreen = () => {
  useTodayTodo();
  useGoals();
  useRoutine();

  return {
  };
};

export default useSplashScreen;
