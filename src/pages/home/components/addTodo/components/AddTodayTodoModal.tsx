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
}

const AddTodayTodoModal = ({ visible, onClose }: Props) => {
  const colors = useRecoilValue(themeColors);
  const { addTodayTodo } = useTodayTodo();

  const [todo, setTodo] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [goalId, setGoalId] = useState('');
  const [alarmInfo, setAlarmInfo] = useState({
    isAlarm: false,
    time: new Date(),
  });

  const onSubmit = useCallback(async () => {
    if (!todo) return;

    await addTodayTodo({
      title: todo,
      isAlarm: alarmInfo.isAlarm,
      time: alarmInfo.isAlarm? alarmInfo.time : undefined,
      startDate,
      goalId,
      onSuccessCallback: onClose,
    });
  }, [goalId, todo, startDate, onClose, addTodayTodo, alarmInfo]);

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

          <StartDateSetting value={startDate} onChange={setStartDate} />

          <View style={{ height: 20 }} />

          <GoalSelectSection goalId={goalId} setGoalId={setGoalId} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AddTodayTodoModal;
