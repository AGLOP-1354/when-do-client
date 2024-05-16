import { useState } from 'react';
import { FlatList, Modal, Pressable, SafeAreaView, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { themeColors } from '../../../atoms/theme.ts';
import { COMMON_COLORS } from './constants';
import ModalHeader from '../ModalHeader.tsx';

type Props = {
  visible: boolean;
  onClose: () => void;
  defaultColor: string;
  onConfirm: (color: string) => void;
}

const ColorPicker = ({ visible, onClose, defaultColor, onConfirm }: Props) => {
  const colors = useRecoilValue(themeColors);

  const [selectedColor, setSelectedColor] = useState(defaultColor || 'gray');

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
          <ModalHeader onClose={onClose} title="색상 선택" onSubmit={() => onConfirm(selectedColor)} />

          <View style={{ height: 40 }} />

          <FlatList
            data={COMMON_COLORS}
            scrollEnabled={false}
            numColumns={7}
            columnWrapperStyle={{ justifyContent: 'space-around' }}
            renderItem={({ item: color }) => {
              const isSelectedColor = color === selectedColor;
              return (
                <Pressable style={{ marginBottom: 20 }} onPress={() => setSelectedColor(color)}>
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 50,
                      padding: 5,
                      backgroundColor: color,
                      ...(isSelectedColor ? {
                        borderWidth: 3,
                        borderColor: colors.accent100,
                      } : {}),
                    }}
                  />
                </Pressable>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ColorPicker;
