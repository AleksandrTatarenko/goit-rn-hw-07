import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Main from './components/Main';

import AppLoading from 'expo-app-loading';
import useFonts from './hooks/useFonts';

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
