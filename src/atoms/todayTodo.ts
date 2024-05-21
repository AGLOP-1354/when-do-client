import { atom } from 'recoil';

export type TodayTodo = {
  id: string;
  title: string;
  isAlarm?: boolean;
  alarmTime?: Date;
  isCompleted?: boolean;
  startDate?: Date;
  goalId?: string;
}

export const todayTodoListAtom = atom<TodayTodo[]>({
  key: 'today-todo',
  default: [],
});
