import { useSetRecoilState } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useFetch from './useFetch.ts';
import { goalsAtom } from '../atoms/goals.ts';
import uuid from 'react-native-uuid';
import useTodayTodo from "./useTodayTodo.ts";
import useRoutine from "./useRoutine.ts";

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

type AddGoalResponse = {
  data: {
    __v: number;
    _id: string;
    userId: string;
    createdAt: Date;
    startDate: Date;
    updatedAt: Date;
    endDate?: Date;
    isCompleted: boolean;
    title: string;
    color: string;
  }[];
};

const useGoals = () => {
  const setGoalList = useSetRecoilState(goalsAtom);

  const { refetchTodayTodoList } = useTodayTodo();
  const { refetchRoutineList } = useRoutine();
  const { kyFetch, kyFetchWithUserId } = useFetch();

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

      try {
        const result = await kyFetch({
          method: 'GET',
          url: `/goal/${asyncStoragePersonId}`
        }) as AddGoalResponse;

        if (result && result.data) {
          const newGoalList = result.data.map(({
            _id,
            startDate,
            isCompleted,
            title,
            endDate,
            color,
          }) => ({
            id: _id,
            title,
            isCompleted,
            color,
            startDate,
            endDate,
          }));

          setGoalList(newGoalList);
        }

        return result;
      } catch (error) {
        console.error(error);
      }
    }
  });

  const addGoal = useMutation({
    mutationFn: async ({
      title,
      isCompleted,
      startDate,
      color,
    }: AddGoalParams) => {
      try {
        const result = await kyFetchWithUserId({
          method: 'POST',
          url: '/goal/add',
          data: {
            id: uuid.v4() as string,
            title,
            isCompleted,
            startDate: startDate,
            color,
          }
        });

        return result;
      } catch (error) {
        console.error(error);
      }
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
      try {
        const result = await kyFetchWithUserId({
          method: 'POST',
          url: '/goal/update',
          data: {
            id,
            title,
            isCompleted,
            startDate,
            endDate,
            color,
          }
        });

        return result;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: async () => {
      await refetchGoalList();
    },
  });

  const deleteGoal = useMutation({
    mutationFn: async ({ id, isDeleteChildItem }: { id: string, isDeleteChildItem: boolean }) => {
      try {
        const result = await kyFetchWithUserId({
          method: 'POST',
          url: '/goal/delete',
          data: {
            id,
            isDeleteChildItem,
          }
        });

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
  })

  return {
    goalListFromDatabase,
    isFetchGoalListLoading,
    addGoal,
    updateGoal,
    deleteGoal,
  };
};

export default useGoals;
