import { View, Text, TextInput } from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeColors } from '../../../atoms/theme.ts';

type Props = {
  defaultValue: string;
  value: string;
  onChangeText?: (changedText: string) => void;
  prefix?: string;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  borderColor?: string;
  onBlur?: () => Promise<void>;
}

const CustomTextInput = ({
  defaultValue,
  value,
  onChangeText,
  prefix,
  disabled,
  placeholder,
  autoFocus,
  borderColor,
  onBlur,
}: Props) => {
  const colors = useRecoilValue(themeColors);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: borderColor || colors.font200,
        padding: 5,
        marginBottom: 8,
      }}
    >
      {
        prefix && (
          <Text
            style={{
              width: 80,
              color: disabled ? colors.font200 : colors.font100,
            }}
          >
            {prefix}
          </Text>
        )
      }
      <TextInput
        autoFocus={autoFocus}
        placeholder={placeholder}
        editable={!disabled}
        defaultValue={defaultValue}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.font200}
        style={{
          flex: 1,
          padding: 5,
          color: disabled ? colors.font200 : colors.font100,
        }}
        blurOnSubmit={false}
        onBlur={onBlur}
      />
    </View>
  );
};

export default CustomTextInput;
