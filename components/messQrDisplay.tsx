import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

export const MessQrDisplay = ({
  order_id,
  mess_name,
}: {
  order_id: string;
  mess_name: string;
}) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        paddingBottom: 10,
        borderRadius: 20,
      }}
    >
      <QRCode
        value={order_id}
        size={175}
        logo={require("../assets/mess-council-logo.png")}
        logoMargin={3}
        logoSize={40}
        logoBorderRadius={100}
        logoBackgroundColor="white"
        backgroundColor="transparent"
      />
      <Text style={{ color: "#000000", marginTop: 15 }}>
        {`${mess_name.charAt(0).toUpperCase()}${mess_name.slice(1)}`}
      </Text>
    </View>
  );
};
