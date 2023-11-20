import { View, StyleSheet, Image } from "react-native";
import { Icon, IconButton } from "react-native-paper";
import { StackActions, useNavigation } from "@react-navigation/native";

export const TopBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <IconButton
        icon="account-circle-outline"
        onPress={() => {
          navigation.dispatch(StackActions.push("Profile"));
        }}
        iconColor="#000000"
        rippleColor="transparent"
      />
      <IconButton
        icon="bell-outline"
        onPress={() => {
          navigation.dispatch(StackActions.push("Notifications"));
        }}
        iconColor="#000000"
        rippleColor="transparent"
      />
      <IconButton
        icon={({ size, color }) => {
          return (
            <View
              style={{
                backgroundColor: "#cfdaff",
                padding: 2,
                borderRadius: 5,
              }}
            >
              <Image
                source={require("../assets/qr-code-icon.png")}
                style={{ width: size + 2, height: size + 2 }}
              />
            </View>
          );
        }}
        onPress={() => {
          navigation.dispatch(StackActions.push("MessQR"));
        }}
        iconColor="#000000"
        rippleColor="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row-reverse",
    marginTop: 10,
  },
});
