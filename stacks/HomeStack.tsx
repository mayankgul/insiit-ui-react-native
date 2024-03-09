import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home/homeScreen";
import { MessMenuScreen } from "../screens/mess/messMenuScreen";
import { MessQRScreen } from "../screens/mess/messQrScreen";
import { NotificationScreen } from "../screens/notificationScreen";
import { ProfileScreen } from "../screens/profileScreen";
import { TopLeftBar, TopRightBar } from "../components/topBar";
import { BusScreen } from "../screens/bus/busScreen";
import { MessForgotPasswordScreen } from "../screens/mess/messForgotPasswordScreen";
import { Animated, View, useColorScheme } from "react-native";

const Stack = createNativeStackNavigator();

export const HomeStack = ({ scrollY }: { scrollY }) => {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        animation: "slide_from_right",
        animationDuration: 200,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
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
      <Stack.Screen
        name="MessMenu"
        component={MessMenuScreen}
        options={{
          headerTitle: "Mess Menu",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colorScheme === "light" ? "#ffffff" : "#202020",
          },
          headerTintColor: colorScheme === "light" ? "#000000" : "#ffffff",
        }}
      />
      <Stack.Screen
        name="Bus"
        component={BusScreen}
        options={{
          headerTitle: "Bus Schedule",
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
