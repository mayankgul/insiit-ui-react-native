import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import {
  ActivityIndicator,
  Button,
  Icon,
  ProgressBar,
  Snackbar,
} from "react-native-paper";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { useEffect, useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useGoogleSignIn } from "../services/auth/googleSignIn";
import { useAppDispatch } from "../services/app/hooks";
import { setUserStorage } from "../services/app/features/user";

maybeCompleteAuthSession();

export const WelcomeScreen = () => {
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
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        // justifyContent: "center",
        paddingTop: "25%",
        justifyContent: "space-between",
        paddingBottom: "11%",
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 40, height: 40, marginRight: 10 }}
            source={require("../assets/icon.png")}
          />
          <Text style={styles.title}>InsIIT</Text>
        </View>

        <Text
          style={{
            marginTop: 7,
            fontSize: 17,
            // textDecorationLine: "underline",
            // fontWeight: "500",
            // fontStyle: "italic",
          }}
        >
          All Things IITGN
        </Text>
      </View>

      <Image
        style={styles.image}
        source={require("../assets/welcome-screen.gif")}
      />

      <View
        style={{ marginBottom: "15%", width: "100%", alignItems: "center" }}
      >
        <Pressable
          style={styles.loginButton}
          onPress={() => {
            startGoogleSignIn();
          }}
        >
          {!isLoading ? (
            <Image
              source={require("../assets/google-logo-transparent.png")}
              style={{ width: 25, height: 25, marginRight: 15 }}
            />
          ) : (
            <ActivityIndicator
              size="small"
              color="#000000"
              style={{ marginRight: 15 }}
            />
          )}

          <Text style={styles.loginButtonText}>Sign In with Google</Text>
        </Pressable>

        <Button
          mode="text"
          textColor="#626262"
          onPress={() => {
            navigation.dispatch(StackActions.replace("TabNav"));
          }}
          style={{ marginTop: "2%" }}
        >
          <Text style={{ fontSize: 13 }}>SKIP</Text>
        </Button>
      </View>

      <Text style={{ fontSize: 14 }}>
        Made with ❤️ by Metis, IIT Gandhinagar
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#ffffff", flex: 1, paddingTop: "25%" },
  image: {
    width: "90%",
    height: 300,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: "6%",
  },
  textContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    marginTop: 10,
    fontStyle: "italic",
  },
  text: {
    fontSize: 15,
    marginTop: 10,
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    borderColor: "#000000",
    borderWidth: 1,
    paddingVertical: 13,
    flexDirection: "row",
    borderRadius: 100,
  },
  loginButtonText: {
    fontSize: 16,
  },
});
