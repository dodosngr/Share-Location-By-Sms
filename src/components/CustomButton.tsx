import { Text, TouchableOpacity } from "react-native"
interface Props {
  onPress?: () => void
  disable?: boolean
  text: string,
  width?: string
}
const CustomButton = (props: Props) => {

  //Uygulamamızda 1 den fazla buton kullandığımız için ve 
  // bu botonları özelleştirmek istediğim için TouchableOpacity kullandım.
  // Belirli tasarımlar yaptım ve bu tasarımları her sayfada kopyala yapıştır yapmak yerine
  // Bir komponent oluşturarak kolaylıkla çağırabiliyoruz.
  // Hem kod karmaşıklığını önlüyor hem de tekrarları azaltmış oluyoruz.

  // props geçerek bazı verileri dışarıdan alabiliyoruz.
  // tıklandığında ne ypaılacağı , aktif pasif , metin ve genişlik .
  const { onPress, disable, text, width } = props;
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={{
        height: 50,
        width: width ? width : "100%",
        maxWidth: "94%",
        margin: "3%",
        borderRadius: 10,
        backgroundColor: disable ? "#8c9da8" : "#5aa8da",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Text
        style={{
          fontSize: 25,
          color: "white",
          textAlign: "center"
        }}>{text}</Text>
    </TouchableOpacity>
  )
}
export default CustomButton;



