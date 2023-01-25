import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import LocationScreen from '../screens/LocationScreen';
const Stack = createNativeStackNavigator();
// Ekran isimlerini dışarıdan kolayca almak ve uygulamada hangi ekranlar var diye
//kolaylık olması açısından ekranların olduğu bir değişken oluşturdum.
// export yaptığımız için de diğer sayfalardan ulaşabiliyoruz.
export const SCREENS = {
  HomeScreen: "HomeScreen",
  LocationScreen: "LocationScreen",
  ContactScreen: "ContactScreen",
}
const Navigation = () => {
  // Aşağıda ise navigation yapısını oluşturdum. 
  // Sayfaların başlığını title ile veriyoruz ve en üstte otomatik olarak gözüküyordur.
  // Stack.Screen sıralamasını değiştirirsek en üstteki olan sayfa ilk olarak açılacaktır.
  //en üstte HomeScreen'ı koyduğumuz için sayfa ilk açıldığında homeScreen açılıyordur.
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Ana Sayfa' }}
        />
        <Stack.Screen
          name="LocationScreen"
          component={LocationScreen}
          options={{ title: 'Konum Ekranı' }}
        />
        <Stack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={{ title: 'Kişi Seçme Ekranı' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;




