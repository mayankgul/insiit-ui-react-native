import { View, StyleSheet, Image, useColorScheme, Text } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../services/app/hooks";

export const TopRightBar = () => {
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  const userData = useAppSelector((state) => state.user);

  return (
    <View style={styles.container}>
      {/* {userData.user !== null ? ( */}
      <IconButton
        icon={({ size, color }) => {
          if (userData.user?.pictureUrl) {
            return (
              <Image
                source={{ uri: userData.user.pictureUrl }}
                style={{
                  width: size + 7,
                  height: size + 7,
                  borderRadius: 100,
                }}
              />
            );
          } else {
            return (
              <Image
                source={
                  colorScheme === "light"
                    ? require("../assets/icons-light/user-icon.png")
                    : require("../assets/icons-dark/user-icon.png")
                }
                style={{ width: size, height: size }}
              />
            );
          }
        }}
        onPress={() => {
          navigation.dispatch(StackActions.push("Profile"));
        }}
        rippleColor="transparent"
      />
      {/* ) : null} */}

      <IconButton
        icon={({ size, color }) => (
          <Image
            source={
              colorScheme === "light"
                ? require("../assets/icons-light/bell-icon.png")
                : require("../assets/icons-dark/bell-icon.png")
            }
            style={{ width: size, height: size }}
          />
        )}
        onPress={() => {
          navigation.dispatch(StackActions.push("Notifications"));
        }}
        rippleColor="transparent"
      />
      <IconButton
        style={{ marginRight: 10 }}
        icon={({ size, color }) => {
          return (
            <View
              style={{
                backgroundColor:
                  colorScheme === "light" ? "#cfdaff" : "#414169",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Image
                source={
                  colorScheme === "light"
                    ? require("../assets/icons-light/qr_code_icon.png")
                    : require("../assets/icons-dark/qr_code_icon.png")
                }
                style={{ width: size - 2, height: size - 2 }}
              />
            </View>
          );
        }}
        onPress={() => {
          navigation.dispatch(StackActions.push("MessQR"));
        }}
        rippleColor="transparent"
      />
    </View>
  );
};

export const TopLeftBar = () => {
  return (
    <View style={{ marginLeft: 10, marginTop: 10 }}>
      <Text>hello</Text>
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
