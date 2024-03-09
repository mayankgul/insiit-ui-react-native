import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MessQRScreen } from "../screens/mess/messQrScreen";
import { NotificationScreen } from "../screens/notificationScreen";
import { ProfileScreen } from "../screens/profileScreen";
import { TopRightBar } from "../components/topBar";
import { MiscScreen } from "../screens/misc/miscScreen";
import { MessForgotPasswordScreen } from "../screens/mess/messForgotPasswordScreen";
import { MapScreen } from "../screens/misc/mapScreen";
import { useColorScheme } from "react-native";

const Stack = createNativeStackNavigator();

export const MiscStack = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ animation: "none" }}
    >
      <Stack.Screen
        name="Misc"
        component={MiscScreen}
        options={{
          headerRight: (_) => <TopRightBar />,
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: {
            backgroundColor: colorScheme === "light" ? "#ffffff" : "#202020",
          },
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
        name="Map"
        component={MapScreen}
        options={{
          headerTitle: "Campus Map",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};
