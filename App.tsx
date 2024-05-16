import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { PaperProvider } from 'react-native-paper';
import { QueryClientProvider, QueryClient } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';

import RootApp from './src/RootApp';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaProvider>
          <PaperProvider>
            <NavigationContainer>
              <RootApp />
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
