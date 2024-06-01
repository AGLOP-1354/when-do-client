import { useMutation, useQuery } from 'react-query';
import { supabase } from '../lib/supabase.ts';

const useRoutineSuccess = ({ routineId }: { routineId: string }) => {
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
      const { data, error } = await supabase.from('routineSuccess')
        .select('*')
        .eq('routineId', routineId);

      if (error) {
        console.error(error);
        return {};
      }

      return data;
    },
    enabled: !!routineId,
  });

  const addRoutineSuccess = useMutation({
    mutationFn: async ({ isSuccess }: { isSuccess: boolean }) => {
      const { data, error } = await supabase.from('routineSuccess').insert([
        {
          routineId,
          isSuccess,
        }
      ]);

      if (error) {
        console.error(error);
        return;
      }

      return data;
    },
  });

  const updateRoutineSuccess = useMutation({
    mutationFn: async ({ isSuccess }: { isSuccess: boolean }) => {
      const result = await supabase.from('routineSuccess').update({
        isSuccess,
      })
      .eq('routineId', routineId);

      return result;
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
