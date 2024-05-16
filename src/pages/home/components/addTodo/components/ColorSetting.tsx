import {Pressable, Text, View} from 'react-native';
import {useState} from 'react';
import {useRecoilValue} from 'recoil';

import ColorPicker from '../../../../../context/component/colorPicker';
import {themeColors} from '../../../../../atoms/theme.ts';
import Box from '../../../../../context/component/Box.tsx';

type Props = {
  defaultValue: string;
  onConfirm: (value: string) => void;
}

const ColorSetting = ({ defaultValue, onConfirm }: Props) => {
  const colors = useRecoilValue(themeColors);

  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  return (
    <Box>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
        <Text style={{ color: colors.font100 }}>색상</Text>

        <Pressable onPress={() => setColorPickerVisible(true)}>
          <View style={{ backgroundColor: defaultValue, width: 20, height: 20, borderRadius: 50 }} />
        </Pressable>

        <ColorPicker
          visible={colorPickerVisible}
          onClose={() => setColorPickerVisible(false)}
          defaultColor={defaultValue}
          onConfirm={(selectedColor) => {
            onConfirm(selectedColor);
            setColorPickerVisible(false);
          }}
        />
      </View>
    </Box>
  );
};

export default ColorSetting;
