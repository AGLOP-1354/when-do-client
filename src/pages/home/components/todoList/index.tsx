import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { FlatList } from 'react-native';

import {goalsAtom} from '../../../../atoms/goals.ts';
import Goal from './components/Goal.tsx';
import { themeColors } from '../../../../atoms/theme.ts';
import { weekCalendarState } from '../../../../atoms/calendar.ts';
import dayjs from 'dayjs';

const TodoList = () => {
  const { selectedWeekDate } = useRecoilValue(weekCalendarState);
  const colors = useRecoilValue(themeColors);
  const goals = useRecoilValue(goalsAtom);

  const TODAY_GOAL = { id: 'today_goal', title: '오늘의 할 일', color: colors.accent100, startDate: new Date() };
  const filteredGoals = goals.filter(({ startDate }) => {
    return dayjs(startDate).isSame(selectedWeekDate, 'd') || dayjs(selectedWeekDate).isAfter(startDate, 'd');
  });
  const parsedGoals = filteredGoals.map(({ id, title, color, startDate }) => ({ id, title, color, startDate }));

  return (
    <FlatList
      style={{ padding: 15 }}
      data={[TODAY_GOAL, ...parsedGoals]}
      renderItem={({ item }) => (
        <Goal
          selectedDate={selectedWeekDate}
          id={item.id}
          title={item.title}
          color={item.color}
          startDate={item.startDate}
        />
      )}
      keyExtractor={(item, idx) => {
        return `${item.id}-${idx}`;
      }}
    />
  );
};

export default memo(TodoList);
