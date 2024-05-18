import { useMutation, useQuery } from 'react-query';
import useFetch from './useFetch.ts';

type RoutineSuccessInfo = {
  data: {
    __v: number;
    _id: string;
    routineId: string;
    isSuccess: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  };
};

const useRoutineSuccess = ({ routineId }: { routineId: string }) => {
  const { kyFetch } = useFetch();

  const {
    data: routineSuccessInfo = {
      isSuccess: false,
      _id: null,
    },
    isLoading: isFetchRoutineSuccessInfoLoading,
    refetch: refetchRoutineSuccessInfo,
  } = useQuery({
    queryKey: ['routine-success', routineId],
    queryFn: async () => {
      try {
        const result = await kyFetch({
          method: 'GET',
          url: `/routine-success/${routineId}`,
        }) as RoutineSuccessInfo;

        if (!result || !result.data) {
          return {
            isSuccess: false,
            _id: null,
          };
        }

        return result.data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!routineId,
  });

  const addRoutineSuccess = useMutation({
    mutationFn: async ({ isSuccess }: { isSuccess: boolean }) => {
      try {
        const result = await kyFetch({
          method: 'POST',
          url: '/routine-success/add',
          data: {
            routineId,
            isSuccess,
          },
        });

        return result;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const updateRoutineSuccess = useMutation({
    mutationFn: async ({ isSuccess }: { isSuccess: boolean }) => {
      try {
        const result = await kyFetch({
          method: 'POST',
          url: '/routine-success/update',
          data: {
            routineId,
            isSuccess,
          },
        });

        return result;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return {
    routineSuccessInfo,
    isFetchRoutineSuccessInfoLoading,
    refetchRoutineSuccessInfo,
    addRoutineSuccess,
    updateRoutineSuccess,
  };
};

export default useRoutineSuccess;
