import { Text, View } from 'react-native';

type Props = {
    text: string;
    color?: string;
    backgroundColor?: string;
    hasTodo?: boolean;
    opacity?: number;
}

const Column = ({
  text,
  hasTodo,
  color,
  backgroundColor,
  opacity = 1,
}: Props) => {
  return (
    <View
      style={{
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
        borderRadius: 50,
        opacity,
      }}>
      <Text
        style={{
          fontSize: 14,
          color,
          textAlign: 'center',
          fontWeight: hasTodo ? 'bold' : 'normal',
          minWidth: 18,
          minHeight: 18,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Column;
