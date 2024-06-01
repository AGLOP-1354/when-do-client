import {useCallback, useState} from 'react';
import { Modal, SafeAreaView, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import uuid from 'react-native-uuid';

import ModalHeader from '../../../../../context/component/ModalHeader.tsx';
import { themeColors } from '../../../../../atoms/theme.ts';
import CustomTextInput from '../../../../../context/component/customFormItems/CustomTextInput.tsx';
import AlarmSetting from './AlarmSetting.tsx';
import StartDateSetting from './StartDateSetting.tsx';
import GoalSelectSection from './GoalSelectSection.tsx';
import useTodayTodo from '../../../../../hooks/useTodayTodo.ts';
import { accountAtom } from '../../../../../atoms/account.ts';

type Props = {
  visible: boolean;
  onClose: () => void;
  id?: string;
  defaultTitle?: string;
  defaultIsAlarm?: boolean;
  defaultAlarmTime?: Date;
  defaultStartDate?: Date;
  defaultGoalId?: string;
}

const TodayTodoSettingModal = ({
  visible,
  onClose,
  id,
  defaultTitle,
  defaultIsAlarm,
  defaultAlarmTime,
  defaultStartDate,
  defaultGoalId,
}: Props) => {
  const colors = useRecoilValue(themeColors);
  const { addTodayTodo, updateTodayTodo } = useTodayTodo();

  const [todo, setTodo] = useState(defaultTitle || '');
  const [startDate, setStartDate] = useState(defaultStartDate || new Date());
  const [goalId, setGoalId] = useState(defaultGoalId || '');
  const [alarmInfo, setAlarmInfo] = useState({
    isAlarm: defaultIsAlarm || false,
    time: defaultAlarmTime || new Date(),
  });

  const onSubmit = useCallback(async () => {
    if (!todo) return;

    if (id) {
      updateTodayTodo.mutate({
        id,
        title: todo,
        isAlarm: alarmInfo.isAlarm,
        alarmTime: alarmInfo.isAlarm? alarmInfo.time : undefined,
        isCompleted: false,
        startDate,
        goalId,
      });
      onClose();
      return;
    }

    await addTodayTodo.mutate({
      title: todo,
      isAlarm: alarmInfo.isAlarm,
      time: alarmInfo.isAlarm? alarmInfo.time : undefined,
      startDate,
      goalId,
      onSuccessCallback: onClose,
    });
  }, [id, goalId, todo, startDate, onClose, addTodayTodo, alarmInfo]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
    >
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: colors.backgroundColor100,
        }}
      >
        <View style={{ padding: 20 }}>
          <ModalHeader onClose={onClose} title="오늘 할 일" onSubmit={onSubmit} submitButtonDisabled={!todo} />

          <View style={{ height: 40 }}  />

          <CustomTextInput
            defaultValue={todo}
            value={todo}
            onChangeText={(text) => setTodo(text)}
            placeholder="오늘의 일정을 입력해보세요!"
          />

          <View style={{ height: 20 }} />

          <AlarmSetting value={alarmInfo} onChange={setAlarmInfo} />

          <View style={{ height: 20 }} />

          <StartDateSetting value={new Date(startDate)} onChange={setStartDate} />

          <View style={{ height: 20 }} />

          <GoalSelectSection goalId={goalId} setGoalId={setGoalId} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default TodayTodoSettingModal;
