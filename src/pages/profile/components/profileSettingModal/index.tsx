import { useState } from 'react';
import {
    Modal,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRecoilValue } from 'recoil';

import ProfileSettingModalHeader from './components/ProfileSettingModalHeader.tsx';
import ProfileImagePicker from './components/ProfileImagePciker.tsx';
import CustomTextInput from '../../../../context/component/customFormItems/CustomTextInput.tsx';
import { themeColors } from '../../../../atoms/theme.ts';

type Props = {
    visible: boolean;
    onSubmit: ({ newName, newDescription }: { newName: string, newDescription?: string }) => void;
    onClose: () => void;
    pickImage: () => void;
    profileImageUri: string;
    name: string;
    description?: string;
}

const ProfileSettingModal = ({
  visible,
  onClose,
  onSubmit,
  profileImageUri,
  pickImage,
  name,
  description,
}: Props) => {
    const colors = useRecoilValue(themeColors);

    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);

    return (
        <Modal visible={visible}>
            <SafeAreaView
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: colors.backgroundColor100,
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={{ paddingHorizontal: 30 }}>
                        <ProfileSettingModalHeader onClose={onClose} onSubmit={() => onSubmit({ newName, newDescription })} />
                        <View style={{ height: 40 }} />

                        <View style={{ alignItems: 'center' }} >
                            <ProfileImagePicker
                                profileImageUri={profileImageUri}
                                pickImage={pickImage}
                            />
                            <View style={{ height: 40 }} />
                            <CustomTextInput
                                onChangeText={changedText => setNewName(changedText)}
                                defaultValue={name}
                                value={newName}
                                prefix="이름"
                            />
                            <CustomTextInput
                                onChangeText={changedText => setNewDescription(changedText)}
                                defaultValue={description || ''}
                                value={newDescription || ''}
                                prefix="자기소개"
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    );
};

export default ProfileSettingModal;
