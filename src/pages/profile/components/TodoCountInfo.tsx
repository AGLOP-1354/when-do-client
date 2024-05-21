import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRecoilValue } from 'recoil';

import { themeColors } from '../../../atoms/theme.ts';
import CustomText from '../../../context/component/CustomText.tsx';

type AdditionalOptionsTemplateProps = {
  iconName: string;
  title: string;
};
const AdditionalOptionsTemplate = ({ iconName, title }: AdditionalOptionsTemplateProps) => {
  const colors = useRecoilValue(themeColors);
  return (
    (
      <View
        style={{
          position: 'relative',
          borderRadius: 8,
          padding: 24,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.backgroundColor200,
          gap: 6,
        }}>
        <View
          style={{
            position: 'absolute',
            left: 10,
            top: -15,
            padding: 8,
            backgroundColor: '#fff',
            borderRadius: 50,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FontAwesome
            name={iconName}
            style={{
              fontSize: 20,
              color: colors.accent100,
            }}
          />
        </View>
        <CustomText style={{ color: colors.font100, fontWeight: 'bold' }}>{title}</CustomText>
      </View>
    )
  );
};

type TodoCountTemplateProps = AdditionalOptionsTemplateProps & {
  count: number;
};

const TodoCountTemplate = ({ iconName, title, count }: TodoCountTemplateProps) => {
  const colors = useRecoilValue(themeColors);

  return (
    <View
      style={{
        borderRadius: 8,
        padding: 24,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.backgroundColor200,
        gap: 6,
      }}
    >
      <FontAwesome
        name={iconName}
        style={{
          fontSize: 20,
          color: colors.accent100,
        }}
      />
      <CustomText style={{ color: colors.font100, fontWeight: 'bold' }}>{title}</CustomText>
      <CustomText style={{ color: colors.font100, fontWeight: 'bold' }}>{count}</CustomText>
    </View>
  );
};

const TodoCountInfo = () => {

  return (
    <View style={{ gap: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <AdditionalOptionsTemplate title="지표" iconName="pie-chart" />
        <AdditionalOptionsTemplate title="노트" iconName="book" />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <TodoCountTemplate title="할일" iconName="pie-chart" count={234} />
        <TodoCountTemplate title="루틴" iconName="pie-chart" count={234} />
        <TodoCountTemplate title="목표" iconName="book" count={7} />
      </View>
    </View>
  );
};

export default TodoCountInfo;
