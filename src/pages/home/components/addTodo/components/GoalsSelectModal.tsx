import {useRecoilValue} from 'recoil';
import {FlatList, Modal, Pressable, SafeAreaView, Text, View} from 'react-native';

import {goalsAtom} from '../../../../../atoms/goals.ts';
import {themeColors} from '../../../../../atoms/theme.ts';
import {Divider} from "react-native-paper";
import CustomText from "../../../../../context/component/CustomText.tsx";

type Props = {
  value: string;
  onSelect: (goalId: string) => void;
  visible: boolean;
  onClose: () => void;
}

const GoalsSelectModal = ({ value, onSelect, visible, onClose }: Props) => {
  const colors = useRecoilValue(themeColors);
  const goals = useRecoilValue(goalsAtom);

  const onSelectGoal = (goalId: string) => {
    onSelect(goalId);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: colors.backgroundColor300, opacity: 0.5 }} />
      <SafeAreaView
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: colors.backgroundColor100,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            padding: 20,
          }}
        >
          <CustomText style={{ color: colors.font100, fontSize: 16, fontWeight: 'bold' }}>목표 선택</CustomText>

          <View style={{ height: 40 }} />

          <FlatList
            data={goals}
            renderItem={({ item }) => {
              const isSelectedColor = item.id === value;
              return (
                <Pressable
                  style={{
                    marginBottom: 20,
                    flex: 1,
                    backgroundColor: isSelectedColor ? colors.backgroundColor300 : colors.backgroundColor200,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                  }}
                  onPress={() => onSelectGoal(item.id)}
                >
                  <View>
                    <CustomText style={{ color: isSelectedColor ? colors.font100 : colors.font200 }}>{item.title}</CustomText>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default GoalsSelectModal;
