import {memo} from 'react';
import { View } from 'react-native';
import CustomText from '../../CustomText.tsx';

const Slogan = () => (
    <View style={{ width: '100%' }}>
        <CustomText
            style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 24,
            }}
        >
            하루를 좀 더 알차게 살아봐요!
        </CustomText>
    </View>
);

export default memo(Slogan);
