import React from 'react';
import { View } from 'react-native';
import { login, me } from '@react-native-kakao/user';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';

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
        await login();

        const profile = await me();

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
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user,
        );

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            if (_id) {
                updateAccount.mutate({
                    socialId: appleAuthRequestResponse.authorizationCode || '',
                    name: appleAuthRequestResponse.fullName ? `${appleAuthRequestResponse.fullName.familyName}}${appleAuthRequestResponse.fullName.givenName}` : '',
                    email: appleAuthRequestResponse.email || '',
                    profileImage: '',
                });
            }

            createAccount.mutate({
                socialId: appleAuthRequestResponse.authorizationCode || '',
                name: appleAuthRequestResponse.fullName ? `${appleAuthRequestResponse.fullName.familyName}}${appleAuthRequestResponse.fullName.givenName}` : '',
                email: appleAuthRequestResponse.email || '',
                profileImage: '',
            });
        }
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
