import { View, Text, useColorScheme, StyleSheet } from "react-native";

export const NotificationScreen = () => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        colorScheme === "light"
          ? { backgroundColor: "#ffffff" }
          : { backgroundColor: "#202020" },
      ]}
    >
      <Text
        style={[
          styles.text,
          colorScheme === "light"
            ? { color: "#000000" }
            : { color: "#ffffffe2" },
        ]}
      >
        No new notifications.
      </Text>
      <Text
        style={[
          styles.text,
          { marginTop: 10 },
          colorScheme === "light"
            ? { color: "#000000" }
            : { color: "#ffffffe2" },
        ]}
      >
        All clear!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
});
