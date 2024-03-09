import { useEffect } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
// import { Divider } from "react-native-paper";
import Animated, {
  // withSequence,
  useAnimatedStyle,
  withDelay,
  withTiming,
  useSharedValue,
  Easing,
  // SlideInLeft,
  withSpring,
  // FadeInDown,
  FadeInUp,
  // SlideInUp,
  FadeIn,
  FadeOut,
  SlideOutUp,
  SlideOutDown,
} from "react-native-reanimated";

export const SplashScreen = () => {
  const colorScheme = useColorScheme();

  const textOpacity = useSharedValue(0);
  const textX = useSharedValue(-150);
  const logoX = useSharedValue(150);

  const startAnimation = () => {
    textOpacity.value = withDelay(
      700,
      withTiming(1, {
        duration: 300,
        easing: Easing.linear,
      })
    );
    textX.value = withSpring(15, { duration: 1000 });
    logoX.value = withSpring(0, { duration: 3000 });
  };

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [
      {
        translateX: textX.value,
      },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: logoX.value,
      },
    ],
  }));

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Animated.View
      style={
        colorScheme === "light" ? lightStyles.container : darkStyles.container
      }
      entering={FadeIn}
      exiting={FadeOut}
    >
      <View
        style={
          colorScheme === "light"
            ? lightStyles.titleContainer
            : darkStyles.titleContainer
        }
      >
        <Animated.Image
          style={[styles.logo, iconStyle]}
          source={require("../assets/icon.png")}
        />
        <Animated.Text
          // entering={SlideInLeft.duration(2000)}
          style={[
            colorScheme === "light" ? lightStyles.title : darkStyles.title,
            textStyle,
          ]}
        >
          InsIIT
        </Animated.Text>
      </View>

      <Animated.View
        style={
          colorScheme === "light"
            ? lightStyles.subtitleContainer
            : darkStyles.subtitleContainer
        }
      >
        <Animated.Text
          entering={FadeInUp.delay(1500).easing(Easing.linear)}
          style={
            colorScheme === "light" ? lightStyles.subtitle : darkStyles.subtitle
          }
        >
          All Things IITGN
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 70,
    // marginRight: 15,
    // position: "absolute",
  },
});

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 10,
  },
  title: { fontSize: 45, color: "#000000" },
  subtitle: { fontSize: 25, color: "#000000" },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 10,
  },
  title: { fontSize: 45, color: "#ffffff" },
  subtitle: { fontSize: 25, color: "#ffffff" },
});
