import { useMutation, useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetRecoilState } from 'recoil';

import { routineAtom } from '../atoms/routine.ts';
import { supabase } from '../lib/supabase.ts';

type AddRoutineParams = {
  title: string;
  isAlarm: boolean,
  alarmTime?: Date,
  startDate?: Date,
  goalId?: string,
  repeatDayOfWeek: string[],
}

const USER_ID = 'userId';

const useRoutine = () => {
  const setRoutineList = useSetRecoilState(routineAtom);

  const {
    data: routineListFromDatabase = [],
    isLoading: isFetchRoutineListLoading,
    refetch: refetchRoutineList,
  } = useQuery({
    queryKey: ['routine-list'],
    queryFn: async () => {
      const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
      if (!asyncStoragePersonId) {
        return {};
      }

      const { data, error } = await supabase.from('routine')
        .select('*')
        .eq('userId', asyncStoragePersonId);

      if (error) {
        console.error(error);
        return;
      }

      if (!data || !data.length) return {};

      setRoutineList(data);

      return data;
    }
  });

  const addRoutine = useMutation({
    mutationFn: async ({
     title,
     isAlarm,
     startDate,
     alarmTime,
     goalId,
     repeatDayOfWeek,
   }: AddRoutineParams) => {
      const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
      if (!asyncStoragePersonId) {
        return {};
      }

      const { data, error } = await supabase.from('routine')
        .insert([
          {
            userId: asyncStoragePersonId,
            title,
            isAlarm,
            alarmTime,
            startDate,
            goalId,
            repeatDayOfWeek,
          },
        ]);

      if (error) {
        console.error(error);
        return;
      }

      return data;
    },
    onSuccess: async () => {
      await refetchRoutineList();
    },
  });

  return {
    addRoutine,
    routineListFromDatabase,
    isFetchRoutineListLoading,
    refetchRoutineList,
  };
};

export default useRoutine;
