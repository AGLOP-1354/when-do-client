import React from 'react';
import { View } from 'react-native';
import * as KakaoLogins from '@react-native-seoul/kakao-login';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import AppleLogo from '../../../../assets/oAuth/apple-logo.svg';
import GoogleLogo from '../../../../assets/oAuth/google-logo.svg';
import KakaoLogo from '../../../../assets/oAuth/kakao-logo.svg';
import { OauthInfo, PROVIDERS, SUPPORTED_OAUTH_INFO } from '../constants';
import OAuthButton from './OAuthButton';
import useAccount from '../../../../hooks/useAccount.ts';
import { useRecoilValue } from 'recoil';
import { accountAtom } from '../../../../atoms/account.ts';

const OAuthButtonList = () => {
    const {
        _id,
    } = useRecoilValue(accountAtom);
    GoogleSignin.configure({
        iosClientId: '2472078504-714cqgrcqbedpf26qe7fj6cba69ttt0t.apps.googleusercontent.com',
    });

    const { createAccount, updateAccount } = useAccount();

    const kakaoLoginRequest = async () => {
        const profile = await KakaoLogins.getProfile();

        if (_id) {
            updateAccount.mutate({
                socialId: String(profile.id),
                name: profile.nickname || '',
                email: profile.email,
                profileImage: profile.thumbnailImageUrl || '',
            });
        }

        createAccount.mutate({
            socialId: String(profile.id),
            name: profile.nickname || '',
            email: profile.email,
            profileImage: profile.thumbnailImageUrl || '',
        });
    };

    const googleLoginRequest = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        if (_id) {
            updateAccount.mutate({
                socialId: userInfo.user.id,
                name: userInfo.user.name || '',
                email: userInfo.user.email,
                profileImage: userInfo.user.photo || '',
            });
        }

        createAccount.mutate({
            socialId: userInfo.user.id,
            name: userInfo.user.name || '',
            email: userInfo.user.email,
            profileImage: userInfo.user.photo || '',
        });
    };

    const appleLoginRequest = async () => {
        await Promise.resolve();
    };

    const providerLoginRequest = (provider: string) => {
        switch (provider) {
            case PROVIDERS.APPLE:
                return appleLoginRequest();
            case PROVIDERS.GOOGLE:
                return googleLoginRequest();
            case PROVIDERS.KAKAO:
                return kakaoLoginRequest();
            default:
                throw Error('invalid provider');
        }
    };

    const providerIcon = (provider: string) => {
        switch (provider) {
            case PROVIDERS.APPLE:
                return <AppleLogo width={20} height={20} />;
            case PROVIDERS.GOOGLE:
                return <GoogleLogo width={20} height={20} />;
            case PROVIDERS.KAKAO:
                return <KakaoLogo width={20} height={20} />;
            default:
                throw Error('invalid provider');
        }
    };

    return (
        <View>
            {SUPPORTED_OAUTH_INFO.map((oauthProvider: OauthInfo) => {
                const { provider } = oauthProvider;
                const icon = providerIcon(provider);
                return (
                    <OAuthButton
                        key={provider}
                        onPress={() => providerLoginRequest(provider)}
                        icon={icon}
                        {...oauthProvider}
                    />
                );
            })}
        </View>
    );
};

export default OAuthButtonList;
