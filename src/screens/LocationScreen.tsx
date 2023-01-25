import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import BottomBar from '../components/BottomBar';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../navigation/navigation';
import openMap, { createMapLink } from "react-native-open-maps";

const LocationScreen = () => {
  const navigation = useNavigation(); // 
  const [currentLongitude, setCurrentLongitude] = useState(0); //kordinatları kaydetmek için
  const [currentLatitude, setCurrentLatitude] = useState(0); // useState yapısını kullanıyoruz ve başlangıçta 0 verdik.
  const [locationStatus, setLocationStatus] = useState(""); // konum durumunu kaydetmek için kullanıyoruz.
  const [mapsUrl, setMapsUrl] = useState(""); // harita linkini kaydetmek için kullandık.
  useEffect(() => {

    // use effect fonksiyonu sayfa açıldığında çalışıyordur.

    // sayfa açıldığında yaptığı işlem kısaca 
    // yetkileri kontrol edip konumu ölçmeye çalışıyordur.

    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Konum izni gerekli',
              message: 'Uygulamanın konuma erişmesi için izin vermeniz gerekmektedir.',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Konum İzni Verilmedi');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };

  }, []);

  // konumu algılamak için aşağıdaki 2 fonksiyon kullanılıyordur.
  // android ios 2 farklı cihazda çalıştığı için farklılıklardan dolayı
  // kütüphane örneğinde böyle 2 farklı fonksiyon ile konum algılanmıştır.
  const getOneTimeLocation = () => {
    setLocationStatus('Konum Algılanıyor...');
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('Konum Başarıyla Algılanmıştır');
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
        const provider = Platform.OS == "ios" ? "apple" : "google";
        const url = createMapLink({ query: currentLatitude + "," + currentLongitude, provider: provider },)
        setMapsUrl(url)
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };


  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus('Konum Başarıyla Algılanmıştır');
        console.log(position);
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  return (
    <SafeAreaView
      // SafeAreaView ekranın üst ve alt kısmındaki tıklanamaz kısımları engelleyen ekranı sadece 
      // tıklanabilir kısımlara göre yerleştiren bir kapsayıcıdır.
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Image
        // konum resmini koyuyoruz.
        source={require("../assets/img/location.png")}
        style={{ marginTop: 20, width: 100, height: 100 }}
      />
      <Text style={{
        fontSize: 25,
        color: 'red',
        marginVertical: 16,
        textAlign: 'center'
      }} // konum ölçülüp ölçülmediği durumuna bakarak ekranda konum durum metnini yazdırıyoruz.
      >
        {locationStatus}
      </Text>
      <CustomButton
        onPress={getOneTimeLocation} // butona tıklandığında konumu tekrar ölçtürüyoruz.
        text="Yenile"
        width='40%' // butonun genişliği ekranın %40 ı olsun diyoruz.
      />
      <CustomButton
        // haritada gör butonudur ve aktif olması için location status "Konum Algılanıyor..." den farklı bir şey olması gerekmektedir.
        // farklı bir şey de konum algılandı mesajı olduğu için konum algılanınca butona tıklayabiliyoruz.
        disable={locationStatus == "Konum Algılanıyor..."}
        onPress={() => {
          //react-native-open-maps kütüphanesi ile verdiğimiz kordinatları maps ile açtırıyoruz.
          // otomatik olarak google veya apple haritalar ile açılmasını sağlıyoruz.
          openMap({ query: currentLatitude + "," + currentLongitude })
        }}
        text="Haritada Gör" width='80%'
      />
      <BottomBar

        disable={locationStatus == "Konum Algılanıyor..."}
        text="İlerle"
        // Butona tıklandığında Kişiler ekranına yönlendiriyor ve 
        // yönlendirirken de url değerini parametre olarak geçiyoruz.
        // Sms gönderirken maps linki lazım olduğu için diğer sayfaya bu veriyi gönderiyoruz.
        onPress={() => navigation.navigate(SCREENS.ContactScreen, { url: mapsUrl })}
      />
    </SafeAreaView>
  );
};

export default LocationScreen;


