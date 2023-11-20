import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { MessMenuScreen } from "../screens/MessMenuScreen";
import { MessQRScreen } from "../screens/MessQRScreen";
import { NotificationScreen } from "../screens/NotificationScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { TopBar } from "../components/TopBar";
import { BusScreen } from "../screens/BusScreen";
import { MessForgotPasswordScreen } from "../screens/messForgotPasswordScreen";

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: (_) => {
            return <TopBar />;
          },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="MessQR"
        component={MessQRScreen}
        options={{
          headerTitle: "View Mess QR",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="MessForgotPassword"
        component={MessForgotPasswordScreen}
        options={{
          headerTitle: "Reset Password",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          headerTitle: "Notifications",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Your Profile",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="MessMenu"
        component={MessMenuScreen}
        options={{
          headerTitle: "Mess Menu",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Bus"
        component={BusScreen}
        options={{
          headerTitle: "Bus Schedule",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};
