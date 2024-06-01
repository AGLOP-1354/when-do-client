import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TodayTodo, todayTodoListAtom } from '../atoms/todayTodo.ts';
import { weekCalendarState } from '../atoms/calendar.ts';
import useWidget from './useWidget.ts';
import { supabase } from '../lib/supabase.ts';

type UpdateTodayTodoParams = {
  id: string;
  title?: string;
  isAlarm?: boolean;
  alarmTime?: Date;
  isCompleted?: boolean;
  startDate?: Date;
  goalId?: string;
}

const USER_ID = 'userId';

const useTodayTodo = () => {
  const { selectedWeekDate } = useRecoilValue(weekCalendarState);
  const setTodayTodoList = useSetRecoilState(todayTodoListAtom);

  const { refetchWidget } = useWidget();

  const {
    data: todayTodoListFromDatabase = [],
    refetch: refetchTodayTodoList,
    isLoading: isFetchTodayTodoListLoading,
  } = useQuery({
    queryKey: ['today-todo-list', selectedWeekDate],
    queryFn: async () => {
      const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
      if (!asyncStoragePersonId) {
        return {};
      }

      const { data, error } = await supabase.from('todayTodo')
        .select('*')
        .eq('userId', asyncStoragePersonId);

      if (error) {
        console.error(error);
        return {};
      }

      setTodayTodoList(data);
      return data;
    }
  });

  const addTodayTodo = useMutation({
    mutationFn: async ({
     title,
     isAlarm,
     time,
     startDate,
     goalId,
     onSuccessCallback = () => {},
   }: {
      title: string,
      isAlarm: boolean,
      time?: Date,
      startDate: Date,
      goalId?: string,
      onSuccessCallback?: () => void,
    }) => {
      const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
      if (!asyncStoragePersonId) {
        return {};
      }

      const { data, error } = await supabase.from('todayTodo').insert([
        {
          userId: asyncStoragePersonId,
          title,
          isAlarm,
          alarmTime: time,
          isCompleted: false,
          startDate: startDate,
          ...(goalId ? { goalId } : {}),
        }
      ]);

      if (error) {
        console.error(error);
        return;
      }

      refetchWidget();
      onSuccessCallback();
      return data;
    },
    onSuccess: async () => {
      await refetchTodayTodoList();
    }
  });

  const updateTodayTodo = useMutation({
    mutationFn: async ({
      id,
      title,
      isAlarm,
      alarmTime,
      isCompleted,
      goalId,
    }: UpdateTodayTodoParams) => {
      const { data, error } = await supabase.from('todayTodo')
        .update({
          title,
          isAlarm,
          alarmTime,
          isCompleted,
          goalId,
        })
        .eq('id', id);

      if (error) {
        console.error(error);
        return;
      }

      return data;
    },
    onSuccess: async () => {
      refetchWidget();
      await refetchTodayTodoList();
    }
  });

  const deleteTodayTodo = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { data, error } = await supabase.from('todayTodo')
        .update({
          deletedAt: new Date(),
        })
        .eq('id', id);

      if (error) {
        console.error(error);
        return;
      }

      return data;
    },
    onSuccess: async () => {
      await refetchTodayTodoList();
    }
  });

  const setTodayTodoBySelectedDate = useCallback((date: dayjs.Dayjs, tempTodayTodo: TodayTodo[]) => {
    setTodayTodoList(tempTodayTodo.filter(({ startDate }) => (
      dayjs(startDate).isSame(date, 'day')
    )));
  }, [setTodayTodoList]);

  return {
    addTodayTodo,
    setTodayTodoBySelectedDate,
    todayTodoListFromDatabase,
    isFetchTodayTodoListLoading,
    updateTodayTodo,
    deleteTodayTodo,
    refetchTodayTodoList,
  };
};

export default useTodayTodo;
