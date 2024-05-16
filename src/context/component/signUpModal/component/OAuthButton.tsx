import React, {ReactNode} from 'react';
import { Pressable, Text } from 'react-native';

import { OauthInfo, PROVIDERS } from '../constants';

interface OauthButtonProps extends OauthInfo {
    onPress?: () => Promise<void>;
    icon: ReactNode,
    provider: string,
    textColor: string,
    backgroundColor: string;
    borderColor?: string;
}
const convertProvider = (provider: string) => {
    switch (provider) {
        case PROVIDERS.APPLE:
            return 'Apple';
        case PROVIDERS.GOOGLE:
            return 'Google';
        case PROVIDERS.KAKAO:
            return '카카오';
    }
};
const OAuthButton = ({ onPress, icon, provider, textColor, backgroundColor, borderColor }: OauthButtonProps) => {
    return (
        <Pressable
            style={{
                backgroundColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                paddingHorizontal: 4,
                paddingVertical: 16,
                marginBottom: 8,
                borderRadius: 12,
                width: '90%',
                margin: 'auto',
                borderColor,
                borderWidth: borderColor ? 1 : 0,
            }}
            onPress={onPress}
        >
            {icon}
            <Text
                style={{
                    color: textColor,
                    fontSize: 16,
                    fontWeight: 'bold',
                }}
            >
                {convertProvider(provider)}로 시작하기
            </Text>
        </Pressable>
    );
};

export default OAuthButton;
