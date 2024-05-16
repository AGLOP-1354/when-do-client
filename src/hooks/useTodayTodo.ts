import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';

import { TodayTodo, todayTodoListAtom } from '../atoms/todayTodo.ts';
import useFetch from './useFetch.ts';
import { getItem, setItem } from '../context/utils/asyncStorage.ts';

type AddTodayTodoParams = TodayTodo & {
  onSuccessCallback?: () => void,
}

const useTodayTodo = () => {
  const todayTodoList = useRecoilValue(todayTodoListAtom);
  const setTodayTodoList = useSetRecoilState(todayTodoListAtom);

  const { kyFetch } = useFetch();

  const addTempTodayTodo = useCallback(async ({
    id,
    title,
    isAlarm,
    alarmTime,
    startDate,
    goalId,
    isCompleted,
    onSuccessCallback = () => {},
  }: AddTodayTodoParams) => {
    const newTodayTodo = [
      ...todayTodoList,
      {
        id,
        title,
        isAlarm,
        alarmTime,
        isCompleted,
        startDate,
        goalId,
      }
    ];
    if (newTodayTodo.length > 3) {
      Alert.alert('추가로 일정을 등록하려면 로그인 해주세요.');
      return;
    }

    setTodayTodoList(newTodayTodo);
    await setItem('tempTodayTodo', JSON.stringify(newTodayTodo));
    onSuccessCallback();
  }, [todayTodoList, setTodayTodoList]);

  const addTodayTodo = useCallback(async ({
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
    if (!title) return;

    const result = await kyFetch({
      method: 'POST',
      url: '/today-todo/add',
      data: {
        title,
        isAlarm,
        time,
        isCompleted: false,
        startDate: startDate,
        goalId,
      }
    }) as TodayTodo;

    setTodayTodoList([
      ...todayTodoList,
      result,
    ]);
    onSuccessCallback();
  }, [kyFetch, setTodayTodoList, todayTodoList]);

  const setTodayTodoBySelectedDate = useCallback((date: dayjs.Dayjs, tempTodayTodo: TodayTodo[]) => {
    setTodayTodoList(tempTodayTodo.filter(({ startDate }) => (
      dayjs(startDate).isSame(date, 'day')
    )));
  }, [setTodayTodoList]);

  const initTempTodayTodo = useCallback(async (date: dayjs.Dayjs) => {
    const tempTodayTodo = await getItem('tempTodayTodo');
    if (!tempTodayTodo) return;

    const parsedTempTodayTodo = JSON.parse(tempTodayTodo) as TodayTodo[];
    setTodayTodoBySelectedDate(date, parsedTempTodayTodo);
  }, [setTodayTodoBySelectedDate]);

  return {
    addTodayTodo,
    addTempTodayTodo,
    setTodayTodoBySelectedDate,
    initTempTodayTodo,
  };
};

export default useTodayTodo;
