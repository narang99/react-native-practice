// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';

// export default function App() {
//   const isLoadingComplete = useCachedResources();
//   const colorScheme = useColorScheme();

//   if (!isLoadingComplete) {
//     return null;
//   } else {
//     return (
//       <SafeAreaProvider>
//         <Navigation colorScheme={colorScheme} />
//         <StatusBar />
//       </SafeAreaProvider>
//     );
//   }
// }

import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface AppProps  {

};

const styles = StyleSheet.create({
  container:  {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center"
  }
});

const App: (props: AppProps) => React.ReactNode = props => {
  const [text, setText] = useState<string>("here is the initial text");
  const onClick = () => {
    setText("changed the text");
  };
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button title="Change Text" onPress={onClick} />
    </View>
  );
};

export default App;