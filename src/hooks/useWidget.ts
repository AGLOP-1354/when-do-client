import { useCallback, useEffect } from 'react';
import { NativeModules, Platform } from 'react-native';
import dayjs from 'dayjs';

import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../lib/supabase.ts";

const USER_ID = 'userId';

const useWidget = () => {
  const { SharedStorage } = NativeModules;

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

      const { data, error } = await supabase.from('todayTodo')
        .select('*')
        .eq('userId', asyncStoragePersonId)
        .lte("startDate", today)
        .gte("startDate", today);

      if (error) {
        console.error(error);
        return {};
      }

      return data.map(({
        id,
        isCompleted,
        title,
      }) => ({
        id,
        title,
        isCompleted,
      }));
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
