import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Checkbox,
  Portal,
  Dialog,
  TextInput,
  Button,
} from "react-native-paper";
import { useFetchMessOrderId } from "../services/auth/messSignIn";
import { useAppDispatch, useAppSelector } from "../services/app/hooks";
import { setMessQrStorage } from "../services/app/features/mess";
import * as WebBrowser from "expo-web-browser";
import { StackActions, useNavigation } from "@react-navigation/native";

export const MessQrSignIn = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const userData = useAppSelector((state) => state.user);
  const messQrData = useAppSelector((state) => state.messQr);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [savePasswordChecked, setSavePasswordChecked] = useState(true);

  const [errorDialogVisible, setErrorDialogVisible] = useState(false);

  const {
    fetchOrderId,
    loading: fetchMessOrderIdLoading,
    isError,
    error,
    isSuccess,
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
    <View style={styles.container}>
      <Text style={styles.title}>Enter your mess portal credentials</Text>

      <View style={styles.textInputContainer}>
        <TextInput
          mode="outlined"
          label="Email"
          style={styles.textInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          left={<TextInput.Icon icon="at" />}
        />
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          mode="outlined"
          label="Password"
          style={styles.textInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          left={<TextInput.Icon icon="dots-horizontal" />}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword((show) => !show)}
            />
          }
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={savePasswordChecked ? "checked" : "unchecked"}
          onPress={() => setSavePasswordChecked((checked) => !checked)}
        />
        <Text style={{ marginLeft: 2 }}>Save password</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={async () => await handleFetchMessOrderId()}
          loading={fetchMessOrderIdLoading}
        >
          Fetch QR
        </Button>

        <Button
          style={{ marginTop: 5 }}
          onPress={() =>
            navigation.dispatch(StackActions.push("MessForgotPassword"))
          }
          rippleColor="transparent"
        >
          <Text style={{ textDecorationLine: "underline" }}>
            Forgot Password?
          </Text>
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={errorDialogVisible}
          onDismiss={() => setErrorDialogVisible(false)}
        >
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Text>{error}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setErrorDialogVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: "8%",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    marginBottom: "8%",
  },
  textInputContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  textInput: {
    backgroundColor: "transparent",
    flex: 1,
  },
  buttonContainer: {
    marginTop: 15,
    width: "50%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
});
