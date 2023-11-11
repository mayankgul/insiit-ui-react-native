import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { MessMenuScreen } from "../screens/MessMenuScreen";
import { MessQRScreen } from "../screens/MessQRScreen";
import { NotificationScreen } from "../screens/NotificationScreen";
import { ProfileScreen } from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MessQR"
        component={MessQRScreen}
        options={{ headerTitle: "View Mess QR" }}
      />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="MessMenu"
        component={MessMenuScreen}
        options={{ headerTitle: "Mess Menu" }}
      />
    </Stack.Navigator>
  );
};
