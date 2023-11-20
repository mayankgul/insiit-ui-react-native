import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <ActivityIndicator color="#D05A2E" size={30} />
      <Text style={{ marginLeft: 15, fontSize: 20 }}>Loading...</Text>
    </View>
  );
};
