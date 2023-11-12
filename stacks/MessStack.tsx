import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MessMenuScreen } from "../screens/MessMenuScreen";
import { MessQRScreen } from "../screens/MessQRScreen";
import { NotificationScreen } from "../screens/NotificationScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { TopBar } from "../components/TopBar";
import { MessScreen } from "../screens/MessScreen";

const Stack = createNativeStackNavigator();

export const MessStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Mess"
        component={MessScreen}
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
