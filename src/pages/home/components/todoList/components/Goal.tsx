import { FlatList, Pressable, Text, View } from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import uuid from 'react-native-uuid';
import {useCallback, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import Todo from './Todo.tsx';
import RoutineSection from './Routine.tsx';
import { todayTodoListAtom } from '../../../../../atoms/todayTodo.ts';
import { themeColors } from '../../../../../atoms/theme.ts';
import CustomTextInput from '../../../../../context/component/customFormItems/CustomTextInput.tsx';
import {routineAtom} from '../../../../../atoms/routine.ts';
import useTodayTodo from '../../../../../hooks/useTodayTodo.ts';
import dayjs from "dayjs";

const TEMP_TODO = {
  title: '',
  isCompleted: false,
  startDate: new Date(),
  isAlarm: false,
  alarmTime: undefined,
};

type Props = {
  id: string;
  title: string;
  color: string;
  selectedDate: dayjs.Dayjs;
}

const Goal = ({ id, title, color, selectedDate }: Props) => {
  const colors = useRecoilValue(themeColors);
  const todayTodoList = useRecoilValue(todayTodoListAtom);
  const routineList = useRecoilValue(routineAtom);
  const setTodayTodoList = useSetRecoilState(todayTodoListAtom);

  const { addTodayTodo } = useTodayTodo();

  const [tempTodoInputVisible, setTempTodoInputVisible] = useState(false);
  const [tempTodoTitle, setTempTodoTitle] = useState('');

  const filteredTodayTodoList = todayTodoList.filter(({ goalId }) => {
    if (id === 'today_goal' && !goalId) return true;
    return goalId === id;
  });
  const filteredRoutineList = routineList.filter(({ goalId, startDate }) => {
    if (dayjs(selectedDate).isBefore(startDate, 'd')) return false;
    if (id === 'today_goal' &&!goalId) return true;
    return goalId === id;
  });

  const onBlurTempTodoTextInput = useCallback(async () => {
    if (tempTodoTitle) {
      await addTodayTodo({
        ...TEMP_TODO,
        title: tempTodoTitle,
        goalId: id === 'today_goal' ? undefined : id,
      });
      setTodayTodoList([
        {
          ...TEMP_TODO,
          id: uuid.v4() as string,
          title: tempTodoTitle,
          goalId: id === 'today_goal' ? undefined : id,
        },
        ...todayTodoList,
      ]);
    }
    setTempTodoTitle('');
    setTempTodoInputVisible(false);
  }, [tempTodoTitle, addTodayTodo, id, setTodayTodoList, todayTodoList]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.backgroundColor200,
          paddingHorizontal: 15,
          paddingVertical: 8,
          borderRadius: 25,
          marginBottom: 10,
        }}
      >
        <Text style={{ color, fontWeight: 'bold' }}>{title}</Text>

        <Pressable onPress={() => setTempTodoInputVisible(true)}>
          <EntypoIcon name="plus" color={colors.font100} />
        </Pressable>
      </View>

      {
        tempTodoInputVisible && (
          <View
            key={`temp-todo-input-${tempTodoInputVisible}`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              overflow: 'hidden',
              paddingHorizontal: 10,
            }}
          >
            <BouncyCheckbox
              disabled
              size={20}
              fillColor={colors.font100}
            />

            <CustomTextInput
              autoFocus
              defaultValue={tempTodoTitle}
              value={tempTodoTitle}
              onChangeText={setTempTodoTitle}
              placeholder="할 일을 입력해주세요."
              borderColor={color}
              onBlur={onBlurTempTodoTextInput}
            />
          </View>
        )
      }

      <FlatList
        data={filteredTodayTodoList}
        renderItem={({ item }) => <Todo todo={item} color={color} />}
      />

      <FlatList
        data={filteredRoutineList}
        renderItem={({ item }) => <RoutineSection routine={item} color={color} />}
      />

      <View style={{ height: 20 }} />
    </View>
  );
};

export default Goal;
