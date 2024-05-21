import { Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useRecoilValue } from 'recoil';

import { Routine } from '../../../../../atoms/routine.ts';
import { themeColors  } from '../../../../../atoms/theme.ts';
import useRoutineSuccess from '../../../../../hooks/useRoutineSuccess.ts';
import CustomText from "../../../../../context/component/CustomText.tsx";

type RoutineProps = {
  routine: Routine;
  color: string;
}

const RoutineSection = ({ routine, color }: RoutineProps) => {
  const colors = useRecoilValue(themeColors);

  const {
    routineSuccessInfo,
    updateRoutineSuccess,
    addRoutineSuccess,
  } = useRoutineSuccess({ routineId: routine.id });

  const onPress = () => {
    if (routineSuccessInfo && routineSuccessInfo._id) {
      updateRoutineSuccess.mutate({
        isSuccess: !routineSuccessInfo.isSuccess,
      });
      return;
    }

    addRoutineSuccess.mutate({
      isSuccess: !routineSuccessInfo.isSuccess,
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
      }}>
      {/* TODO: 체크 시 앱 아이콘이 보이도록 수정 */}
      <BouncyCheckbox
        isChecked={routineSuccessInfo.isSuccess}
        size={20}
        fillColor={color}
        onPress={() => onPress()}
      />

      <CustomText style={{ color: colors.font100 }}>{routine.title}</CustomText>
    </View>
  );
};

export default RoutineSection;
