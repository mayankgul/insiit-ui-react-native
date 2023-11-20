import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { WelcomeScreen } from "./screens/WelcomeScreen";
// import { useFonts } from "expo-font";
import { PaperProvider } from "react-native-paper";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "./screens/SplashScreen";
import { useAppDispatch, useAppSelector } from "./services/app/hooks";
import { ErrorScreen } from "./screens/ErrorScreen";
import { Provider as ReduxProvider } from "react-redux";
import store from "./services/app/store";
import { TabNav } from "./components/TabNav";
import { getUserStorage } from "./services/app/features/user";

const Stack = createNativeStackNavigator();

const App = () => {
  // const [loaded] = useFonts({
  //   Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  // });

  const [page, setPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserStorage());
  }, []);

  useEffect(() => {
    if (userData.loading !== null) {
      if (userData.loading) {
        setLoading(true);
      } else {
        setLoading(false);
        if (userData.user !== null) {
          setPage("TabNav");
        } else {
          setPage("Welcome");
        }
      }
    }
  }, [userData]);

  if (loading) {
    return <SplashScreen />;
  }

  if (userData.error !== null) {
    return <ErrorScreen error={userData.error} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName={page}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNav"
          component={TabNav}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

const AppWrapper = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <App />
        </PaperProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default AppWrapper;
