import { useCallback, useEffect } from 'react';
import { NativeModules, Platform } from 'react-native';
import dayjs from 'dayjs';

import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from './useFetch.ts';

const USER_ID = 'userId';

type TodayTodoListResponse = {
  data: {
    __v: number;
    _id: string;
    isAlarm: boolean,
    alarmTime?: Date;
    updatedAt: Date;
    createdAt: Date;
    startDate: Date;
    isCompleted?: boolean;
    title: string;
    userId: string;
    goalId?: string;
  }[];
}

const useWidget = () => {
  const { SharedStorage } = NativeModules;
  const { kyFetchWithUserId } = useFetch();

  const today = dayjs().format('YYYY-MM-DD');
  const {
    data: todayTodoListFromDatabase = [],
    isLoading: isFetchTodayTodoListLoading,
  } = useQuery({
    queryKey: ['today-todo-list', today],
    queryFn: async () => {
      const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
      if (!asyncStoragePersonId) {
        return {};
      }

      try {
        const result = await kyFetchWithUserId({
          method: 'GET',
          url: `/today-todo/${asyncStoragePersonId}/${String(today)}`
        }) as TodayTodoListResponse;

        if (!result || !result.data) return {};

        return result.data.map(({
          _id,
          isCompleted,
          title,
        }) => ({
          id: _id,
          title,
          isCompleted,
        }));
      } catch (error) {
        console.error(error);
      }
    }
  });

  const setWidget = useCallback(async () => {
    if (Platform.OS === 'ios') {
      SharedStorage.set(JSON.stringify(todayTodoListFromDatabase));
      return;
    }

    SharedStorage.set(JSON.stringify({ data: todayTodoListFromDatabase }));
  }, [todayTodoListFromDatabase, SharedStorage]);

  useEffect(() => {
    if (isFetchTodayTodoListLoading) return;
    void setWidget();
  }, [setWidget, isFetchTodayTodoListLoading]);

  return {
    refetchWidget: setWidget,
  };
};

export default useWidget;
