import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { USER_LOCAL_STORAGE } from "../models/globals";
import { styles as homeStyles } from "../styles/homeStyles";
import { StackActions, useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const Home = ({ name }: { name: string }) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={homeStyles.title}>Hi, {name.split(" ")[0]}!</Text>
      <Button
        mode="contained"
        onPress={async () => {
          await AsyncStorage.removeItem(USER_LOCAL_STORAGE);
          navigation.dispatch(StackActions.replace("Welcome"));
        }}
      >
        Logout
      </Button>
    </View>
  );
};
