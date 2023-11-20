import { StackActions, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../services/app/hooks";
import { removeUserStorage } from "../services/app/features/user";

export const ProfileScreen = () => {
  const navigation = useNavigation();

  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (userData.user === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>Sign in to view your profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Avatar.Image source={{ uri: userData.user.pictureUrl }} size={100} />

      <View style={styles.profileContainer}>
        <View style={styles.profileKeysContainer}>
          <Text style={{ fontSize: 16 }}>Name:</Text>
          <Text style={{ fontSize: 16, marginTop: 10 }}>Email:</Text>
        </View>

        <View style={styles.profileValuesContainer}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Mayank Gulati
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
            mayank.gulati@iitgn.ac.in
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
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingTop: "8%",
  },
  profileContainer: {
    flexDirection: "row",
    marginTop: 50,
  },
  profileKeysContainer: {},
  profileValuesContainer: {
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
});
