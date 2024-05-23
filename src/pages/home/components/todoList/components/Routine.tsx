import { Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useRecoilValue } from 'recoil';

import { Routine } from '../../../../../atoms/routine.ts';
import { themeColors  } from '../../../../../atoms/theme.ts';
import useRoutineSuccess from '../../../../../hooks/useRoutineSuccess.ts';
import CustomText from "../../../../../context/component/CustomText.tsx";
import RoutineMenu from "./RoutineMenu.tsx";

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
        justifyContent:'space-between',
        paddingLeft: 15,
        paddingRight: 20,
      }}>
      {/* TODO: 체크 시 앱 아이콘이 보이도록 수정 */}
      <View style={{ flexDirection: 'row' }}>
        <BouncyCheckbox
          isChecked={routineSuccessInfo.isSuccess}
          size={20}
          fillColor={color}
          onPress={() => onPress()}
          style={{ width: 30 }}
        />

        <CustomText style={{ color: colors.font100 }}>{routine.title}</CustomText>
      </View>
    </View>
  );
};

export default RoutineSection;
