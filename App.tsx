import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, useColorScheme } from "react-native";
import { WelcomeScreen } from "./screens/welcomeScreen";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "./screens/splashScreen";
import { useAppDispatch, useAppSelector } from "./services/app/hooks";
import { ErrorScreen } from "./screens/errorScreen";
import { Provider as ReduxProvider } from "react-redux";
import store from "./services/app/store";
import { TabNav } from "./components/tabNav";
import { getUserStorage } from "./services/app/features/user";

const Stack = createNativeStackNavigator();

const App = () => {
  // const [loaded] = useFonts({
  //   Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  //   Ionicons: require("@expo/vector-icons/Ionicons.d.ts"),
  // });

  const colorScheme = useColorScheme();

  const [page, setPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    dispatch(getUserStorage());

    const animatingTimeout = setTimeout(() => {
      setAnimating(false);
    }, 3500);

    return () => {
      clearTimeout(animatingTimeout);
    };
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

  if (animating || loading) {
    return (
      <>
        <SplashScreen />
        <StatusBar style="auto" />
      </>
    );
  }

  if (userData.error !== null) {
    return <ErrorScreen error={userData.error} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Navigator
        initialRouteName={page}
        screenOptions={{
          animation: "slide_from_right",
          animationTypeForReplace: "push",
        }}
      >
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

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: "transparent",
  },
};

const AppWrapper = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default AppWrapper;
