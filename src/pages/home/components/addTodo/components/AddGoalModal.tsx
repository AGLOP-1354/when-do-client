import {useCallback, useState} from 'react';
import { Modal, SafeAreaView, View } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import uuid from 'react-native-uuid';

import ModalHeader from '../../../../../context/component/ModalHeader.tsx';
import { themeColors } from '../../../../../atoms/theme.ts';
import CustomTextInput from '../../../../../context/component/customFormItems/CustomTextInput.tsx';
import StartDateSetting from './StartDateSetting.tsx';
import {goalsAtom} from '../../../../../atoms/goals.ts';
import ColorSetting from './ColorSetting.tsx';

type Props = {
  visible: boolean;
  onClose: () => void;
}

const AddGoalModal = ({ visible, onClose }: Props) => {
  const colors = useRecoilValue(themeColors);
  const goals = useRecoilValue(goalsAtom);
  const setGoals = useSetRecoilState(goalsAtom);

  const [goalTitle, setGoalTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [goalColor, setGoalColor] = useState('gray');

  const onSubmit = useCallback(() => {
    if (!goalTitle) return;

    setGoals([
      ...goals,
      {
        id: uuid.v4() as string,
        title: goalTitle,
        isCompleted: false,
        startDate: startDate,
        color: goalColor,
      }
    ]);
    onClose();
  }, [goalTitle, goalColor, startDate, goals, setGoals, onClose]);

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

          <StartDateSetting value={startDate} onChange={setStartDate} />

          <View style={{ height: 20 }}  />

          <ColorSetting defaultValue={goalColor} onConfirm={setGoalColor} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AddGoalModal;