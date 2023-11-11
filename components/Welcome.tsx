import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { styles as welcomeStyles } from "../styles/welcomeStyles";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_LOCAL_STORAGE } from "../models/globals";
import { StackActions, useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

export const Welcome = () => {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState<any>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "881936870792-9bfq1rka70e49p2etc4m9grovr3oeu98.apps.googleusercontent.com",
  });
  useEffect(() => {
    handleGoogleSignIn();
  }, [response]);

  useEffect(() => {
    const updateStorage = async () => {
      await AsyncStorage.setItem(USER_LOCAL_STORAGE, JSON.stringify(userInfo));
    };

    const navigateHome = () => {
      navigation.dispatch(
        StackActions.replace("Home", { name: userInfo.name })
      );
    };

    if (userInfo !== null) {
      updateStorage();
      navigateHome();
    }
  }, [userInfo]);

  const handleGoogleSignIn = async () => {
    if (response?.type === "success") {
      await getUserInfo(response.authentication.accessToken);
    } else {
      setUserInfo(null);
    }
  };

  const getUserInfo = async (token: string) => {
    if (!token) return;
    await axios({
      method: "GET",
      url: "https://www.googleapis.com/userinfo/v2/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUserInfo(null);
      });
  };

  return (
    <View style={welcomeStyles.container}>
      <View style={welcomeStyles.imageContainer}>
        <Image
          style={welcomeStyles.image}
          source={require("../assets/welcome-screen.gif")}
        />
      </View>
      <View style={welcomeStyles.textContainer}>
        <Text style={welcomeStyles.title}>InsIIT</Text>
        <Text style={welcomeStyles.subtitle}>All things IITGN</Text>
      </View>

      <View style={welcomeStyles.buttonContainer}>
        <Button
          mode="outlined"
          style={welcomeStyles.loginButton}
          textColor="#000000"
          onPress={() => {
            promptAsync();
          }}
        >
          <Text style={welcomeStyles.loginButtonText}>Sign In with Google</Text>
        </Button>

        <Button
          mode="text"
          textColor="#626262"
          style={welcomeStyles.skipButton}
        >
          <Text style={welcomeStyles.skipButtonText}>SKIP</Text>
        </Button>
      </View>
    </View>
  );
};
