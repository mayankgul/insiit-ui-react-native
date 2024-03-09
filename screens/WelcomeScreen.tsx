import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  useColorScheme,
  Dimensions,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { useEffect } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useGoogleSignIn } from "../services/auth/google";
import { useAppDispatch } from "../services/app/hooks";
import { setUserStorage } from "../services/app/features/user";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
} from "react-native-reanimated";

maybeCompleteAuthSession();

export const WelcomeScreen = () => {
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  const { startGoogleSignIn, userInfo, isLoading, isSuccess, isError, error } =
    useGoogleSignIn();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userInfo !== null) {
      dispatch(
        setUserStorage({
          email: userInfo.email,
          name: userInfo.name,
          pictureUrl: userInfo.picture,
        })
      );
    }
  }, [userInfo]);

  useEffect(() => {
    if (isSuccess) {
      const navigateHome = () => {
        navigation.dispatch(StackActions.replace("TabNav"));
      };

      const navigateTimeout = setTimeout(() => {
        navigateHome();
      }, 6500);

      return () => {
        clearTimeout(navigateTimeout);
      };
    }
  }, [isSuccess]);

  return (
    <Animated.View
      style={[
        styles.container,
        colorScheme === "light"
          ? { backgroundColor: "#ffffff" }
          : { backgroundColor: "#212121" },
      ]}
      entering={FadeIn}
    >
      <View style={styles.brandContainer}>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={require("../assets/icon.png")} />
          <Text
            style={[
              styles.title,
              colorScheme === "light"
                ? { color: "#000000" }
                : { color: "#ffffffe0" },
            ]}
          >
            InsIIT
          </Text>
        </View>

        <Text
          style={[
            styles.subtitle,
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe6" },
          ]}
        >
          All Things IITGN
        </Text>
      </View>

      <Image
        style={styles.image}
        source={
          colorScheme === "light"
            ? require("../assets/welcome-screen-light.gif")
            : require("../assets/welcome-screen-dark.png")
        }
      />

      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.loginButton,
            colorScheme === "light"
              ? {
                  backgroundColor: "#000000",
                  borderColor: "#000000",
                }
              : {
                  backgroundColor: "#ffffffe6",
                  borderColor: "#ffffffe6",
                },
          ]}
          onPress={() => {
            startGoogleSignIn();
          }}
        >
          {!isLoading ? (
            <Image
              source={require("../assets/icons-light/google_logo_transparent.png")}
              style={styles.googleLogo}
            />
          ) : (
            <ActivityIndicator
              size="small"
              color={colorScheme === "light" ? "#ffffff" : "#000000"}
              style={styles.loadingIndicator}
            />
          )}

          <Text
            style={[
              styles.loginButtonText,
              colorScheme === "light"
                ? { color: "#ffffff" }
                : { color: "#000000" },
            ]}
          >
            Sign In with Google
          </Text>
        </Pressable>

        <Button
          mode="text"
          rippleColor="transparent"
          onPress={() => {
            navigation.dispatch(StackActions.replace("TabNav"));
          }}
          style={styles.skipButton}
        >
          <Text
            style={[
              styles.skipButtonText,
              colorScheme === "light"
                ? { color: "#626262" }
                : { color: "#ffffffc9" },
            ]}
          >
            SKIP
          </Text>
        </Button>
      </View>

      <Text
        style={[
          styles.footerText,
          colorScheme === "light"
            ? { color: "#000000" }
            : { color: "#ffffffe6" },
        ]}
      >
        Made with ❤️ by Metis, IIT Gandhinagar
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: "25%",
    justifyContent: "space-between",
    paddingBottom: "11%",
  },
  brandContainer: { alignItems: "center", justifyContent: "center" },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: { width: 40, height: 40, marginRight: 10 },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 7,
    fontSize: 17,
    // textDecorationLine: "underline",
    // fontWeight: "500",
    // fontStyle: "italic",
  },
  image: {
    width: "90%",
    maxWidth: 400,
    height: Dimensions.get("screen").width * (90 / 100) <= 375 ? 300 : 450,
  },
  buttonContainer: { marginBottom: "15%", width: "100%", alignItems: "center" },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    borderWidth: 1,
    paddingVertical: 11,
    flexDirection: "row",
    borderRadius: 100,
  },
  loginButtonText: {
    fontSize: 16,
  },
  googleLogo: { width: 20, height: 20, marginRight: 15 },
  loadingIndicator: { marginRight: 15 },
  skipButton: { marginTop: "2%" },
  skipButtonText: { fontSize: 13 },
  footerText: { fontSize: 14 },
});
