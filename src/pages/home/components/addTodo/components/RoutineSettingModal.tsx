import {useCallback, useState} from 'react';
import { Modal, SafeAreaView, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import ModalHeader from '../../../../../context/component/ModalHeader.tsx';
import { themeColors } from '../../../../../atoms/theme.ts';
import CustomTextInput from '../../../../../context/component/customFormItems/CustomTextInput.tsx';
import AlarmSetting from './AlarmSetting.tsx';
import StartDateSetting from './StartDateSetting.tsx';
import GoalSelectSection from './GoalSelectSection.tsx';
import RepeatDayOfWeekSelector from './RepeatDayOfWeekSelector.tsx';
import { DAY_OF_WEEK } from '../constants';
import useRoutine from '../../../../../hooks/useRoutine.ts';

type Props = {
  visible: boolean;
  onClose: () => void;
}

const AddRoutineModal = ({ visible, onClose }: Props) => {
  const colors = useRecoilValue(themeColors);

  const { addRoutine } = useRoutine();

  const [todo, setTodo] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [goalId, setGoalId] = useState('');
  const [repeatDayOfWeek, setRepeatDayOfWeek] = useState(DAY_OF_WEEK.map(({ key }) => key));
  const [alarmInfo, setAlarmInfo] = useState({
    isAlarm: false,
    time: new Date(),
  });

  const onChangeDayOfWeek = ({ type, key }: { type: string, key: string }) => {
    switch (type) {
      case 'add':
        setRepeatDayOfWeek((prev) => {
          if (!prev.length) return [key];
          return [...prev, key];
        });
        break;
      case'remove':
        setRepeatDayOfWeek(repeatDayOfWeek.filter(dayOfWeek => dayOfWeek!== key));
        break;
      default:
        break;
    }
  };

  const onSubmit = useCallback(() => {
    if (!todo) return;


    addRoutine.mutate({
      title: todo,
      isAlarm: alarmInfo.isAlarm,
      alarmTime: alarmInfo.isAlarm? alarmInfo.time : undefined,
      repeatDayOfWeek,
      startDate: startDate,
      goalId,
    });
    onClose();
  }, [todo, addRoutine, alarmInfo.isAlarm, alarmInfo.time, repeatDayOfWeek, startDate, goalId, onClose]);

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
          <ModalHeader onClose={onClose} title="루틴 추가" onSubmit={onSubmit} submitButtonDisabled={!todo || repeatDayOfWeek.length <= 0} />

          <View style={{ height: 40 }}  />

          <CustomTextInput
            defaultValue={todo}
            value={todo}
            onChangeText={(text) => setTodo(text)}
            placeholder="루틴의 이름을 적어주세요!"
          />

          <View style={{ height: 20 }} />

          <AlarmSetting value={alarmInfo} onChange={setAlarmInfo} />

          <View style={{ height: 20 }} />

          <RepeatDayOfWeekSelector selectedDayOfWeek={repeatDayOfWeek} onChange={onChangeDayOfWeek} />

          <View style={{ height: 20 }} />

          <StartDateSetting value={startDate} onChange={setStartDate} />

          <View style={{ height: 20 }} />

          <GoalSelectSection goalId={goalId} setGoalId={setGoalId} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AddRoutineModal;
