import React from 'react';
import { SafeAreaView } from 'react-native';
import Navigation from './src/navigation/navigation';
const App = () => {
  // sayfa ilk açıldığında burası çalışıyordur ve burada da Navigation'a 
  // yönlendirdiği için navigationdaki ilk  Stack.Screen ekranda gözükecektir.
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Navigation />
    </SafeAreaView>
  );
};
export default App;