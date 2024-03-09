import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import { BusScreen } from "../screens/bus/busScreen";
import { TopRightBar } from "../components/topBar";
import { MessQRScreen } from "../screens/mess/messQrScreen";
import { MessForgotPasswordScreen } from "../screens/mess/messForgotPasswordScreen";
import { NotificationScreen } from "../screens/notificationScreen";
import { ProfileScreen } from "../screens/profileScreen";

const Stack = createNativeStackNavigator();

export const BusStack = ({ scrollY }: { scrollY }) => {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Bus"
      screenOptions={{
        animation: "slide_from_right",
        animationDuration: 200,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="Bus"
        component={BusScreen}
        options={{
          headerRight: () => <TopRightBar />,
          // headerLeft: () => <TopLeftBar />,
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
          headerTitle: "Mess QR",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colorScheme === "light" ? "#ffffff" : "#202020",
          },
          headerTintColor: colorScheme === "light" ? "#000000" : "#ffffff",
        }}
      />
      <Stack.Screen
        name="MessForgotPassword"
        component={MessForgotPasswordScreen}
        options={{
          headerTitle: "Reset Password",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colorScheme === "light" ? "#ffffff" : "#202020",
          },
          headerTintColor: colorScheme === "light" ? "#000000" : "#ffffff",
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          headerTitle: "Notifications",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colorScheme === "light" ? "#ffffff" : "#202020",
          },
          headerTintColor: colorScheme === "light" ? "#000000" : "#ffffff",
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Your Profile",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colorScheme === "light" ? "#ffffff" : "#202020",
          },
          headerTintColor: colorScheme === "light" ? "#000000" : "#ffffff",
        }}
      />
    </Stack.Navigator>
  );
};
