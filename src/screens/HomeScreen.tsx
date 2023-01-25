import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Text, View } from "react-native";
import BottomBar from "../components/BottomBar";
import { SCREENS } from "../navigation/navigation";

const HomeScreen = () => {
  const navigation = useNavigation() // Navigation öğesini çağırıyoruz ve bunun ile yönlendirme yapabileceğiz.
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
      //sayfanın aşağı yukarı kaydırılması için scroolview eklendi.
      >
        <View style={{
          alignItems: "center" // öğeleri ortala
        }}>
          <Image
            style={{ marginTop: 30, height: 200, width: 200 }}
            source={require("../assets/img/logo.jpeg")}  // assest/images klasörü içerisindeki resimi ekranda gösterdik.
          />
          <Text style={{
            marginTop: 10, //yukarıdan 10 pixel boşluk bıraktık
            fontSize: 30, // yazının boyutu
            color: "blue" //yazının rengi
          }}>TRAKYA ÜNİVERSİTESİ</Text>
          <Text style={{ marginTop: 10, fontSize: 26, color: "#000" }}>Bilgisayar Mühendisliği</Text>
          <Text style={{ marginTop: 10, fontSize: 24, color: "#000" }}>Mobil Uygulama Dersi</Text>
          <Text style={{ marginTop: 10, fontSize: 18, color: "#000" }}>Konum Öğrenip Sms İle Paylaşma Uygulaması</Text>
          <Text style={{ marginTop: 20, fontSize: 26, color: "#000" }}>DOĞUKAN SONGÜR</Text>
          <Text style={{ marginTop: 10, fontSize: 26, color: "#000" }}>1171602024</Text>
        </View>
      </ScrollView>
      <BottomBar
        text="İlerle" // buton yazısı
        onPress={() => {
          // butona tıklanırsa Lokasyon sayfasına yönlendir.
          navigation.navigate(SCREENS.LocationScreen);
        }}
      />
    </View >
  )
}
export default HomeScreen;


