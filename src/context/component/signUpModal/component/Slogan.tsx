import {memo} from 'react';
import { View, Text } from 'react-native';

const Slogan = () => (
    <View style={{ width: '100%' }}>
        <Text
            style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 24,
            }}
        >
            하루를 좀 더 알차게 살아봐요!
        </Text>
    </View>
);

export default memo(Slogan);
