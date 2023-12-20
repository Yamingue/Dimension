/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigation } from './App/Navigators/BottomNavigation';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './App/Store/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import BootSplash from "react-native-bootsplash";

let persistor = persistStore(store)


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <PaperProvider>
              <BottomNavigation />
            </PaperProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
