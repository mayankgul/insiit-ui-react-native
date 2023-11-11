import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Welcome } from "./components/Welcome";
import { useFonts } from "expo-font";
import { PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_LOCAL_STORAGE, user } from "./models/globals";
import { Home } from "./components/Home";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  // if (!loaded) {
  //   return null;
  // }

  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(USER_LOCAL_STORAGE).then((data) => {
      if (data) {
        setUser(JSON.parse(data));
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider>
        <View style={styles.container}>
          <Stack.Navigator
            initialRouteName={user !== null ? "Home" : "Welcome"}
          >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Home">
              {() => {
                return <Home name={user ? user.name : null} />;
              }}
            </Stack.Screen>
          </Stack.Navigator>
          {/* {user !== null ? <Home name={user.name} /> : <Welcome />} */}
          <StatusBar style="dark" />
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
