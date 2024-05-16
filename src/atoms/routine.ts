import { atom } from 'recoil';

export type Routine = {
  id: string;
  title: string;
  isAlarm: boolean;
  alarmTime?: Date;
  startDate: Date;
  goalId?: string;
  repeatDayOfWeek: string[],
}

export const routineAtom = atom<Routine[]>({
  key: 'routine',
  default: [],
});
