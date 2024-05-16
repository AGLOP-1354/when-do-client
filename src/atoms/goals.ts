import { atom } from 'recoil';

export type GoalTodo = {
  id: string;
  title: string;
  isCompleted: boolean;
  color: string;
  startDate: Date;
  endDate?: Date;
}

export const goalsAtom = atom<GoalTodo[]>({
  key: 'goal',
  default: [],
});
