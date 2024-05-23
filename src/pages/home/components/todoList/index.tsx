import { memo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FlatList } from 'react-native';
import dayjs from 'dayjs';

import {goalsAtom} from '../../../../atoms/goals.ts';
import Goal from './components/Goal.tsx';
import { themeColors } from '../../../../atoms/theme.ts';
import { weekCalendarState } from '../../../../atoms/calendar.ts';
import TodayTodoSettingModal from '../addTodo/components/TodayTodoSettingModal.tsx';
import { TodayTodo } from '../../../../atoms/todayTodo.ts';

const TODAY_TODO_INIT_DATA = {
  alarmTime: undefined,
  goalId: '',
  id: '',
  isAlarm: false,
  isCompleted: false,
  startDate: undefined,
  title: ''
};

const TodoList = () => {
  const { selectedWeekDate } = useRecoilValue(weekCalendarState);
  const colors = useRecoilValue(themeColors);
  const goals = useRecoilValue(goalsAtom);

  const [selectedTodayTodo, setSelectedTodayTodo] = useState<TodayTodo>(TODAY_TODO_INIT_DATA);

  const TODAY_GOAL = { id: 'today_goal', title: '오늘의 할 일', color: colors.accent100, startDate: new Date() };
  const filteredGoals = goals.filter(({ startDate }) => {
    return dayjs(startDate).isSame(selectedWeekDate, 'd') || dayjs(selectedWeekDate).isAfter(startDate, 'd');
  });
  const parsedGoals = filteredGoals.map(({ id, title, color, startDate }) => ({ id, title, color, startDate }));

  return (
    <>
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
            setSelectedTodayTodo={setSelectedTodayTodo}
          />
        )}
        keyExtractor={(item, idx) => {
          return `${item.id}-${idx}`;
        }}
      />

      <TodayTodoSettingModal
        key={`today-todo-setting-modal-${selectedTodayTodo.id}`}
        visible={!!selectedTodayTodo.id}
        id={selectedTodayTodo.id}
        defaultTitle={selectedTodayTodo.title}
        defaultIsAlarm={selectedTodayTodo.isAlarm}
        defaultAlarmTime={selectedTodayTodo.alarmTime}
        defaultStartDate={selectedTodayTodo.startDate}
        defaultGoalId={selectedTodayTodo.goalId}
        onClose={() => setSelectedTodayTodo(TODAY_TODO_INIT_DATA)}
      />
    </>
  );
};

export default memo(TodoList);
