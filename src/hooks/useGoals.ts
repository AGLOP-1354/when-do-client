import { useSetRecoilState } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { goalsAtom } from '../atoms/goals.ts';
import useTodayTodo from './useTodayTodo.ts';
import useRoutine from './useRoutine.ts';
import { supabase } from '../lib/supabase.ts';

const USER_ID = 'userId';

type AddGoalParams = {
  title: string;
  isCompleted?: boolean;
  startDate: Date;
  color?: string;
};
type UpdateGoalParams = {
  id: string;
  title?: string;
  isCompleted?: boolean;
  startDate?: Date;
  endDate?: Date;
  color?: string;
}

const useGoals = () => {
  const setGoalList = useSetRecoilState(goalsAtom);

  const { refetchTodayTodoList } = useTodayTodo();
  const { refetchRoutineList } = useRoutine();

  const {
    data: goalListFromDatabase = [],
    isLoading: isFetchGoalListLoading,
    refetch: refetchGoalList,
  } = useQuery({
    queryKey: ['goal-list'],
    queryFn: async () => {
      const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
      if (!asyncStoragePersonId) {
        return {};
      }

      const { data, error } = await supabase.from('goal')
        .select('*')
        .eq('userId', asyncStoragePersonId);

      if (error) {
        console.error(error);
        return;
      }

      setGoalList(data);
      return data;
    }
  });

  const addGoal = useMutation({
    mutationFn: async ({
      title,
      isCompleted,
      startDate,
      color,
    }: AddGoalParams) => {
      const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
      if (!asyncStoragePersonId) {
        return {};
      }

      const { data, error } = await supabase.from('goal')
        .insert({
          userId: asyncStoragePersonId,
          title,
          isCompleted,
          startDate: startDate,
          color,
        });

      if (error) {
        console.error(error);
        return;
      }

      return data;
    },
    onSuccess: async () => {
      await refetchGoalList();
    },
  });

  const updateGoal = useMutation({
    mutationFn: async ({
      id,
      title,
      isCompleted,
      startDate,
      endDate,
      color,
    }: UpdateGoalParams) => {
      const { data, error } = await supabase.from('goal')
        .update({
          title,
          isCompleted,
          startDate,
          endDate,
          color,
        })
        .eq('id', id);

      if (error) {
        console.error(error);
        return;
      }

      return data;
    },
    onSuccess: async () => {
      await refetchGoalList();
    },
  });

  const deleteGoal = useMutation({
    mutationFn: async ({ id, isDeleteChildItem }: { id: string, isDeleteChildItem: boolean }) => {
      try {
        const result = await supabase.from('goal')
          .delete()
          .eq('id', id);

        if (isDeleteChildItem) {
          await supabase.from('todayTodo').delete().eq('goalId', id);
          await supabase.from('routine').delete().eq('goalId', id);
        } else {
          await supabase.from('todayTodo').update({ goalId: null }).eq('goalId', id);
          await supabase.from('routine').update({ goalId: null }).eq('goalId', id);
        }

        return result;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: async () => {
      await refetchGoalList();
      await refetchTodayTodoList();
      await refetchRoutineList();
    },
  });

  return {
    goalListFromDatabase,
    isFetchGoalListLoading,
    addGoal,
    updateGoal,
    deleteGoal,
  };
};

export default useGoals;
