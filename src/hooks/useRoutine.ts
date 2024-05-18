import { useMutation, useQuery } from 'react-query';
import useFetch from './useFetch.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { routineAtom } from '../atoms/routine.ts';
import { useSetRecoilState } from 'recoil';

type AddRoutineParams = {
  title: string;
  isAlarm: boolean,
  alarmTime?: Date,
  startDate?: Date,
  goalId?: string,
  repeatDayOfWeek: string[],
}
type RoutineListResponse = {
  data: {
    __v: number;
    _id: string;
    createdAt: Date;
    deletedAt?: Date;
    endDate?: Date;
    goalId?: string;
    isAlarm: boolean;
    alarmTime?: Date;
    repeatDayOfWeek: string[],
    startDate: Date;
    title: string;
    updatedAt: Date;
    userId: string;
  }[],
};

const USER_ID = 'userId';

const useRoutine = () => {
  const setRoutineList = useSetRecoilState(routineAtom);
  const { kyFetchWithUserId, kyFetch } = useFetch();

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

      try {
        const result = await kyFetch({
          method: 'GET',
          url: `/routine/${asyncStoragePersonId}`
        }) as RoutineListResponse;

        if (result && result.data) {
          const newRoutineList = result.data.map(({
            _id,
            title,
            isAlarm,
            alarmTime,
            startDate,
            goalId,
            repeatDayOfWeek,
          }) => ({
            id: _id,
            title,
            isAlarm,
            alarmTime,
            startDate,
            goalId,
            repeatDayOfWeek,
          }));

          setRoutineList(newRoutineList);
        }

        return result;
      } catch (err) {
        console.error(err);
      }
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
      try {
        const result = await kyFetchWithUserId({
          method: 'POST',
          url: '/routine/add',
          data: {
            title,
            isAlarm,
            alarmTime,
            startDate,
            goalId,
            repeatDayOfWeek,
          },
        });

        return result;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: async () => {
      await refetchRoutineList();
    },
  });

  return {
    addRoutine,
    routineListFromDatabase,
    isFetchRoutineListLoading,
  };
};

export default useRoutine;
