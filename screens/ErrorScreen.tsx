import { View, Text } from "react-native";

export const ErrorScreen = ({ error }: { error?: string }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 30 }}>An error occurred</Text>
      <Text style={{ fontSize: 20 }}>{error}</Text>
    </View>
  );
};
