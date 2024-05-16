import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRecoilValue } from 'recoil';
import { Pressable, Text, View } from 'react-native';

import Box from '../../../../../context/component/Box.tsx';
import GoalsSelectModal from './GoalsSelectModal.tsx';
import { themeColors } from '../../../../../atoms/theme.ts';
import { goalsAtom } from '../../../../../atoms/goals.ts';

type Props = {
  goalId: string;
  setGoalId: (goalId: string) => void;
}

const GoalSelectSection = ({ goalId, setGoalId }: Props) => {
  const colors = useRecoilValue(themeColors);
  const goals = useRecoilValue(goalsAtom);

  const [goalSelectModalVisible, setGoalSelectModalVisible] = useState(false);

  const onSelect = (selectedGoalId: string) => {
    setGoalId(selectedGoalId);
    setGoalSelectModalVisible(false);
  };

  const selectedGoal = goals.find(({ id }) => id === goalId);

  return (
    <Box>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="flag" size={16} color={colors.font100} />
            <Text style={{ color: colors.font100 }}>목표</Text>
          </View>
        </View>

        <Pressable
          style={{
            backgroundColor: colors.backgroundColor300,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 8,
          }}
          onPress={() => setGoalSelectModalVisible(true)}
        >
          <Text style={{ color: selectedGoal ? colors.font100 : colors.font200 }}>{selectedGoal ? selectedGoal?.title : '목표 선택'}</Text>
        </Pressable>

        <GoalsSelectModal
          value={goalId}
          onSelect={onSelect}
          visible={goalSelectModalVisible}
          onClose={() => setGoalSelectModalVisible(false)}
        />
      </View>
    </Box>
  );
};

export default GoalSelectSection;
