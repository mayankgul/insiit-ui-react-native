import { View, Text, ScrollView, useColorScheme } from "react-native";

export const BusScreen = () => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "light" ? "#ffffff" : "#202020",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ color: colorScheme === "light" ? "#000000" : "#ffffffe2" }}
      >
        Bus Screen
      </Text>
    </View>
  );
};
