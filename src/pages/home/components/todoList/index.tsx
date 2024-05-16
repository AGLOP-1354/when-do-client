import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { FlatList } from 'react-native';

import {goalsAtom} from '../../../../atoms/goals.ts';
import Goal from './components/Goal.tsx';
import { themeColors } from '../../../../atoms/theme.ts';

const TodoList = () => {
  const colors = useRecoilValue(themeColors);
  const goals = useRecoilValue(goalsAtom);

  const TODAY_GOAL = { id: 'today_goal', title: '오늘의 할 일', color: colors.accent100 };
  const parsedGoals = goals.map(({ id, title, color }) => ({ id, title, color }));

  return (
    <FlatList
      style={{ padding: 15 }}
      data={[TODAY_GOAL, ...parsedGoals]}
      renderItem={({ item }) => <Goal id={item.id} title={item.title} color={item.color} />}
      keyExtractor={(item, idx) => {
        return `${item.id}-${idx}`;
      }}
    />
  );
};

export default memo(TodoList);
