import { ReactElement } from 'react';
import { ActivityIndicator, View } from 'react-native';

type Props = {
  loading: boolean;
  children: ReactElement;
}

const Loading = ({ loading, children }: Props) => {
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return children;
};

export default Loading;
