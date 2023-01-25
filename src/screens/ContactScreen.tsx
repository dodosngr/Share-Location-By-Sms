import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform, Text, View } from "react-native";
import { Contact, selectContact, } from "react-native-select-contact";
import BottomBar from "../components/BottomBar";
import CustomButton from "../components/CustomButton";
import SendSMS from "react-native-sms";
interface Props {
  navigation: any,
  route: any
}
const ContactScreen = (props: Props) => {
  const [mapUrl, setMapsUrl] = useState("") // önceki ekrandan gelen map linkini bu değişkende tutacağız.
  const [selected, setSelected] = useState<Contact>();
  // seçilen kişi bilgilerini kaydetmek için Concact türünde bir değişken oluşturduk.

  // bu fonksiyon sayfa açıldığında çalışıyordur 
  useEffect(() => {
    // önceki ekrandan bir parametre geldiyse ve ismi url'yse bu url yi map linki olarak ayarlıyoruz.
    if (props.route.params.url) {
      setMapsUrl(props.route.params.url)
    }
  }, [])


  // kiş seçme butonuna tıklayınca aşağıdaki fonksiyon çalışıyordur ve kişi seçince selected değişkenine
  // seçilen kişinin bilgilerini kaydediyordur.
  const selectPerson = async () => {
    if (await ContactPermission()) {
      const selectedPerson = await selectContact();
      if (selectedPerson) { // kişi seçildiyse
        setSelected(selectedPerson); // bilgileri kaydet.
      }
    }
  };

  // android de yetkileri kontrol etmemizi bu fonksiyon sağlıyordur..
  const ContactPermission = async () => {
    if (Platform.OS === 'android') {
      const request = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (request === PermissionsAndroid.RESULTS.DENIED) {
        Alert.alert("Permission Denied");
        return false;
      }
      else if (request === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert("Permission Denied");
        return false;
      }
    }
    return true;
  };


  // sms gönderme butonuna tıklandıysa
  const smsGonder = () => {
    if (selected) { // seçilen bir kişi varsa
      const number = selected.phones[0].number.toString();
      // number değişkeni oluşturup seçilen kişinin ilk numarasını atıyoruz.
      SendSMS.send(
        {
          body: mapUrl, // sms metni olarak map url yi
          recipients: [number], // alıcı olarak number değişkeniin
          successTypes: ['sent', 'queued'],
        },
        (completed, cancelled, error) => {
          // sms gönderme yapınca başarılı başarısız veya vazgeçme durumlarını ekranda alert ile gösteriyoruz.
          if (completed) {
            Alert.alert('SMS başarıyla gönderilmiştir.');
          } else if (cancelled) {
            Alert.alert('SMS gönderilmekten vazgeçilmiştir');
          } else if (error) {
            Alert.alert('Sms gönderme hatası oluştu');
          }
        },
      );
    }
  }

  // sayfanın tasarımı aşağıdaki gibidir.
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white", paddingTop: 30, }}>
      <Text style={{ color: "black", fontSize: 22, }} >Sms Gönderilecek Kişiyi Seçiniz</Text>
      <CustomButton text="Kişi Seç" width="50%" onPress={selectPerson} />
      <View style={{ width: "100%", marginTop: 30, alignItems: "center" }}>
        {
          selected ? // seçilen kişi varsa aşağıdaki kodlar ekranda görüntüleniyor ve kişi bilgilerini yazdırıyoruz.
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ color: "black", fontSize: 25, marginBottom: 10, }}>Kişi Bilgileri</Text>
              <Text style={{ color: "black", fontSize: 22, }} >Ad Soyad : {selected.name}</Text>
              <Text style={{ color: "black", fontSize: 22, }} >Numara : {selected.phones[0].number}</Text>
            </View>
            :
            // seçilen kişi yoksa kişi seçilmemiştir yazısı yazıyordur.
            <Text style={{ color: "red", fontSize: 24, }}>Kişi Seçilmemiştir!</Text>
        }
      </View>

      <BottomBar
        disable={selected == undefined}  // bir kişi seçilmediyse butonu pasif yap
        text="Sms Gönder"
        onPress={smsGonder}  //butona tıklandığında sms gönder fonksiyonu çalışacaktır.
      />
    </View>
  )
}
export default ContactScreen;



