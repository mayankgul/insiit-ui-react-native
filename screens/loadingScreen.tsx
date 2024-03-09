import { View, useColorScheme, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Animated, { FadeIn, SlideOutRight } from "react-native-reanimated";

export const LoadingScreen = ({ text }: { text?: string }) => {
  const colorScheme = useColorScheme();

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        },
        colorScheme === "light"
          ? { backgroundColor: "#ffffff" }
          : { backgroundColor: "#202020" },
      ]}
      //   entering={FadeIn}
      exiting={SlideOutRight.delay(500)}
    >
      <ActivityIndicator size={35} color="#6173f8" />
      <Text
        style={[
          { marginLeft: 20, fontSize: 20 },
          colorScheme === "light"
            ? { color: "#000000" }
            : { color: "#ffffffe2" },
        ]}
      >
        {text ? text : "Loading..."}
      </Text>
    </Animated.View>
  );
};
