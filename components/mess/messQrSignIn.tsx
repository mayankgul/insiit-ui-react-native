import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  useColorScheme,
  Linking,
} from "react-native";
import {
  Portal,
  Dialog,
  TextInput,
  Button,
  IconButton,
} from "react-native-paper";
import { useFetchMessOrderId } from "../../services/auth/mess";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import { setMessQrStorage } from "../../services/app/features/mess";
import { StackActions, useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export const MessQrSignIn = () => {
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const userData = useAppSelector((state) => state.user);
  const messQrData = useAppSelector((state) => state.messQr);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [savePasswordChecked, setSavePasswordChecked] = useState(true);

  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [messHelpDialogVisible, setMessHelpDialogVisible] = useState(false);

  const {
    fetchOrderId,
    loading: fetchMessOrderIdLoading,
    isError,
    error,
    isSuccess,
    setError,
    setIsError,
  } = useFetchMessOrderId();

  useEffect(() => {
    if (userData.user !== null) setEmail(userData.user.email);
  }, []);

  useEffect(() => {
    if (isError) {
      setErrorDialogVisible(true);
      return;
    }
  }, [isError]);

  const handleFetchMessOrderId = async () => {
    fetchOrderId(email, password).then(
      ({ order_id, mess_name, roll_no, name }) => {
        if (order_id) {
          if (savePasswordChecked) {
            dispatch(
              setMessQrStorage({
                email: email,
                password: password,
                order_id,
                roll_no,
                name,
                mess_name,
              })
            );
          } else {
            dispatch(
              setMessQrStorage({
                email: email,
                password: null,
                order_id,
                roll_no,
                name,
                mess_name,
              })
            );
          }
        }
      }
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        colorScheme === "light"
          ? { backgroundColor: "#ffffff" }
          : { backgroundColor: "#202020" },
      ]}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text
          style={[
            styles.title,
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          Use your Mess credentials
        </Text>

        <IconButton
          icon={({ size, color }) => (
            <Image
              source={
                colorScheme === "light"
                  ? require("../../assets/icons-light/info-icon.png")
                  : require("../../assets/icons-dark/info-icon.png")
              }
              style={{ width: size, height: size, marginBottom: 4 }}
            />
          )}
          size={15}
          style={{ marginTop: 0, marginLeft: 2 }}
          onPress={() => setMessHelpDialogVisible(true)}
        />
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          mode="outlined"
          outlineColor={colorScheme === "light" ? "#000000" : "#ffffffbb"}
          activeOutlineColor={colorScheme === "light" ? "#000000" : "#ffffffbb"}
          placeholderTextColor={
            colorScheme === "light" ? "#000000" : "#ffffffe2"
          }
          textColor={colorScheme === "light" ? "#000000" : "#ffffff"}
          placeholder="Email"
          style={styles.textInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          left={
            <TextInput.Icon
              icon={({ size, color }) => (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../../assets/icons-light/email-outline-icon.png")
                      : require("../../assets/icons-dark/email-outline-icon.png")
                  }
                  style={{ width: size + 5, height: size + 5 }}
                />
              )}
            />
          }
        />
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          mode="outlined"
          outlineColor={colorScheme === "light" ? "#000000" : "#ffffffbb"}
          activeOutlineColor={colorScheme === "light" ? "#000000" : "#ffffffbb"}
          placeholder="Password"
          placeholderTextColor={
            colorScheme === "light" ? "#000000" : "#ffffffe2"
          }
          textColor={colorScheme === "light" ? "#000000" : "#ffffff"}
          style={[styles.textInput]}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          left={
            <TextInput.Icon
              icon={({ size, color }) => (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../../assets/icons-light/dots-icon.png")
                      : require("../../assets/icons-dark/dots-icon.png")
                  }
                  style={{ width: size, height: size }}
                />
              )}
            />
          }
        />
        <IconButton
          style={{
            borderColor: colorScheme === "light" ? "#000000" : "#ffffff",
            backgroundColor: colorScheme === "light" ? "#000000" : "#ffffff",
            borderWidth: 1,
            borderRadius: 5,
            height: 56,
            width: 50,
            margin: 0,
            marginLeft: 7,
          }}
          icon={({ size, color }) => {
            if (showPassword) {
              return (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../../assets/icons-light/eye-off-icon.png")
                      : require("../../assets/icons-dark/eye-off-icon.png")
                  }
                  style={{ width: size, height: size }}
                />
              );
            } else {
              return (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../../assets/icons-light/eye-icon.png")
                      : require("../../assets/icons-dark/eye-icon.png")
                  }
                  style={{ width: size, height: size }}
                />
              );
            }
          }}
          onPress={() => setShowPassword((show) => !show)}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Pressable
          style={{ width: 25, height: 25 }}
          onPress={() => setSavePasswordChecked((check) => !check)}
        >
          {savePasswordChecked ? (
            <Image
              style={{ width: 25, height: 25 }}
              source={
                colorScheme === "light"
                  ? require("../../assets/icons-light/checkbox-checked.png")
                  : require("../../assets/icons-dark/checkbox-checked.png")
              }
            />
          ) : (
            <Image
              style={{ width: 25, height: 25 }}
              source={
                colorScheme === "light"
                  ? require("../../assets/icons-light/checkbox-unchecked.png")
                  : require("../../assets/icons-dark/checkbox-unchecked.png")
              }
            />
          )}
        </Pressable>
        <Pressable
          onPress={() => setSavePasswordChecked((check) => !check)}
          style={{ height: 30, justifyContent: "center" }}
        >
          <Text
            style={{
              marginLeft: 7,
              color: colorScheme === "light" ? "#000000" : "#ffffffe2",
            }}
          >
            Save password
          </Text>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={async () => await handleFetchMessOrderId()}
          loading={fetchMessOrderIdLoading}
          style={{
            backgroundColor: colorScheme === "light" ? "#000000" : "#3f3f3f",
          }}
          // disabled={email === "" || password === ""}
        >
          <Text style={{ color: "#ffffff" }}>Fetch QR</Text>
        </Button>

        <Button
          style={{ marginTop: 5 }}
          onPress={() =>
            navigation.dispatch(StackActions.push("MessForgotPassword"))
          }
          rippleColor="transparent"
        >
          <Text
            style={{
              textDecorationLine: "underline",
              color: colorScheme === "light" ? "#000000" : "#ffffffe2",
            }}
          >
            Forgot Password?
          </Text>
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={errorDialogVisible}
          onDismiss={() => {
            setErrorDialogVisible(false);
            setError(null);
            setIsError(false);
          }}
          style={{
            backgroundColor: colorScheme === "light" ? "#dde1ff" : "#36364c",
          }}
        >
          <Dialog.Title
            style={{ color: colorScheme === "light" ? "#000000" : "#ffffffe2" }}
          >
            Error
          </Dialog.Title>
          <Dialog.Content>
            <Text
              style={{
                color: colorScheme === "light" ? "#000000" : "#ffffffe2",
              }}
            >
              {error}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              textColor={colorScheme === "light" ? "#000000" : "#ffffffe2"}
              onPress={() => {
                setErrorDialogVisible(false);
                setError(null);
                setIsError(false);
              }}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={messHelpDialogVisible}
          onDismiss={() => setMessHelpDialogVisible(false)}
          style={{
            backgroundColor: colorScheme === "light" ? "#dde1ff" : "#36364c",
          }}
        >
          <Dialog.Title
            style={{ color: colorScheme === "light" ? "#000000" : "#ffffffe2" }}
          >
            Mess Account
          </Dialog.Title>
          <Dialog.Content>
            <Text
              style={{
                color: colorScheme === "light" ? "#000000" : "#ffffffe2",
              }}
            >
              Please use the credentials that you use to login at{" "}
              <Text
                style={{
                  color: colorScheme === "light" ? "#3950feb8" : "#6b7dffe6",
                  textDecorationLine: "underline",
                }}
                onPress={() => Linking.openURL("http://mess.iitgn.ac.in/")}
              >
                mess.iitgn.ac.in
              </Text>
              . If you do not have an account, please create one here:{" "}
              <Text
                style={{
                  color: colorScheme === "light" ? "#3950feb8" : "#6b7dffe6",
                  textDecorationLine: "underline",
                }}
                onPress={() =>
                  Linking.openURL("http://mess.iitgn.ac.in/register.php")
                }
              >
                Sign up
              </Text>
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              textColor={colorScheme === "light" ? "#000000" : "#ffffffe2"}
              onPress={() => setMessHelpDialogVisible(false)}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "11%",
  },
  title: {
    fontSize: 17,
    marginBottom: "7%",
  },
  textInputContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  textInput: {
    backgroundColor: "transparent",
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    width: "50%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
