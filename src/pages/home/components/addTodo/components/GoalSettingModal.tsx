import {useCallback, useState} from 'react';
import { Modal, SafeAreaView, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import ModalHeader from '../../../../../context/component/ModalHeader.tsx';
import { themeColors } from '../../../../../atoms/theme.ts';
import CustomTextInput from '../../../../../context/component/customFormItems/CustomTextInput.tsx';
import StartDateSetting from './StartDateSetting.tsx';
import ColorSetting from './ColorSetting.tsx';
import useGoals from '../../../../../hooks/useGoals.ts';

type Props = {
  visible: boolean;
  onClose: () => void;
  defaultTitle?: string;
  defaultStartDate?: Date;
  defaultGoalColor?: string;
  id?: string;
}

const GoalSettingModal = ({
  visible,
  onClose,
  defaultTitle,
  defaultStartDate,
  defaultGoalColor,
  id,
}: Props) => {
  const colors = useRecoilValue(themeColors);
  const { addGoal, updateGoal } = useGoals();

  const [goalTitle, setGoalTitle] = useState(defaultTitle || '');
  const [startDate, setStartDate] = useState(defaultStartDate || new Date());
  const [goalColor, setGoalColor] = useState(defaultGoalColor || 'gray');

  const onSubmit = useCallback(() => {
    if (!goalTitle) return;

    if (id) {
      updateGoal.mutate({
        id,
        title: goalTitle,
        isCompleted: false,
        startDate: startDate,
        color: goalColor,
      });
      onClose();
      return;
    }

    addGoal.mutate({
      title: goalTitle,
      isCompleted: false,
      startDate: startDate,
      color: goalColor,
    });
    onClose();
  }, [goalTitle, addGoal, startDate, goalColor, onClose]);

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
          <ModalHeader onClose={onClose} title="목표 설정" onSubmit={onSubmit} submitButtonDisabled={!goalTitle} />

          <View style={{ height: 40 }}  />

          <CustomTextInput
            defaultValue={goalTitle}
            value={goalTitle}
            onChangeText={(text) => setGoalTitle(text)}
            placeholder="이루고 싶은 목표를 작성해보세요!"
          />

          <View style={{ height: 20 }}  />

          <StartDateSetting value={new Date(startDate)} onChange={setStartDate} />

          <View style={{ height: 20 }}  />

          <ColorSetting defaultValue={goalColor} onConfirm={setGoalColor} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default GoalSettingModal;
