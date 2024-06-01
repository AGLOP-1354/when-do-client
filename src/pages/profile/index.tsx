/* eslint-disable */
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { useRecoilValue } from 'recoil';

import { accountAtom } from "../../atoms/account.ts";
import SignUpModal from '../../context/component/signUpModal';
import { StatusBarHeight } from '../../context/constants';
import ProfileImage from './components/ProfileImage.tsx';
import ProfileInfo from "./components/ProfileInfo.tsx";
import ProfileSettingModal from "./components/profileSettingModal";
import InduceLoginSection from "./components/profileSettingModal/components/InduceLoginSection.tsx";
import {themeColors} from "../../atoms/theme.ts";
import ThemeSwitch from "./components/ThemeSwitch.tsx";
import useAccount from "../../hooks/useAccount.ts";
import LogoutButton from "./components/LogoutButton.tsx";
import TodoCountInfo from "./components/TodoCountInfo.tsx";

const Profile = () => {
  const {
    id,
    socialId,
    name,
    description,
    profileImage,
  } = useRecoilValue(accountAtom);
  const colors = useRecoilValue(themeColors);
  const {
    isLoggedIn,
    isFetchAccountInfoLoading,
    createTempAccount,
    updateAccount,
  } = useAccount();

  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [profileSettingModalVisible, setProfileSettingModalVisible] = useState(false);
  const [profileImageUri, setProfileImageUri] = useState(profileImage || '');

  useEffect(() => {
    if (isFetchAccountInfoLoading) return;
    if (id) setSignUpModalVisible(false);
    if (!id) setSignUpModalVisible(true);
  }, [id, isFetchAccountInfoLoading]);

  const pickImage = async() =>{
    // @ts-ignore
    const result = await launchImageLibrary();
    if (result.didCancel){
      return null;
    }
    // @ts-ignore
    const localUri = result.assets[0].uri;
    // @ts-ignore
    const uriPath = localUri.split('//').pop();
    setProfileImageUri('file://'+uriPath);
  };

  const onCloseSignUpModal = useCallback(() => {
    if (!id) {
      createTempAccount.mutate();
    }
    setTimeout(() => setSignUpModalVisible(false), 1000);
  }, [id]);

  const onOpenProfileSettingModal = useCallback(() => setProfileSettingModalVisible(true), []);
  const onCloseProfileSettingModal = useCallback(() => setProfileSettingModalVisible(false), []);

  return (
    <View
      style={{
        paddingTop: StatusBarHeight + 50,
        padding: 26,
        backgroundColor: colors.backgroundColor100,
        height: '100%',
        gap: 24,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <ProfileImage profileImageUri={profileImageUri} onPress={onOpenProfileSettingModal} name={name} />
        <ProfileInfo name={name} description={description} />
      </View>
      <ThemeSwitch />

      <SignUpModal
        isLoggedIn={isLoggedIn}
        visible={signUpModalVisible}
        onClose={onCloseSignUpModal}
        onUseWithoutLogin={onCloseSignUpModal}
      />
      <ProfileSettingModal
        visible={profileSettingModalVisible}
        onClose={onCloseProfileSettingModal}
        onSubmit={({ newName, newDescription }) => {
          updateAccount.mutate({
            name: newName,
            description: newDescription,
            profileImage: profileImageUri,
          });
          onCloseProfileSettingModal();
        }}
        pickImage={pickImage}
        profileImageUri={profileImageUri}
        name={name}
        description={description}
      />

      {
        socialId ? <View /> : (
            <InduceLoginSection showSignUpModal={() => setSignUpModalVisible(true)} />
        )
      }

      {
        socialId && (
          <TodoCountInfo />
        )
      }

      {
        socialId && (
          <LogoutButton />
        )
      }
    </View>
  );
};

export default Profile;
