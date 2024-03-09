import { StackActions, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../services/app/hooks";
import { removeUserStorage } from "../services/app/features/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProfileScreen = () => {
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (userData.user === null) {
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          colorScheme === "light"
            ? { backgroundColor: "#ffffff" }
            : { backgroundColor: "#202020" },
        ]}
      >
        <Text
          style={[
            { fontSize: 18 },
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          Sign in to view your profile
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            AsyncStorage.clear();
          }}
          style={{
            backgroundColor: colorScheme === "light" ? "#000000" : "#3f3f3f",
          }}
        >
          Clear Storage
        </Button>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        colorScheme === "light"
          ? { backgroundColor: "#ffffff" }
          : { backgroundColor: "#202020" },
      ]}
    >
      <Avatar.Image source={{ uri: userData.user.pictureUrl }} size={100} />

      <View style={styles.profileContainer}>
        <View>
          <Text
            style={[
              { fontSize: 16 },
              colorScheme === "light"
                ? { color: "#000000" }
                : { color: "#ffffffe2" },
            ]}
          >
            Name:
          </Text>
          <Text
            style={[
              { fontSize: 16, marginTop: 10 },
              colorScheme === "light"
                ? { color: "#000000" }
                : { color: "#ffffffe2" },
            ]}
          >
            Email:
          </Text>
        </View>

        <View style={styles.profileValuesContainer}>
          <Text
            style={[
              { fontSize: 16, fontWeight: "bold" },
              colorScheme === "light"
                ? { color: "#000000" }
                : { color: "#ffffffe2" },
            ]}
          >
            {userData.user.name}
          </Text>
          <Text
            style={[
              { fontSize: 16, fontWeight: "bold", marginTop: 10 },
              colorScheme === "light"
                ? { color: "#000000" }
                : { color: "#ffffffe2" },
            ]}
          >
            {userData.user.email}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => {
            dispatch(removeUserStorage());
            navigation.dispatch(StackActions.replace("Welcome"));
          }}
          style={{
            backgroundColor: colorScheme === "light" ? "#000000" : "#3f3f3f",
          }}
        >
          Logout
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            AsyncStorage.clear();
          }}
          style={{
            backgroundColor: colorScheme === "light" ? "#000000" : "#3f3f3f",
          }}
        >
          Clear Storage
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "8%",
  },
  profileContainer: {
    flexDirection: "row",
    marginTop: 50,
  },
  profileValuesContainer: {
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
});
