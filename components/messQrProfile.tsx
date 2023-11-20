import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";
import { useAppDispatch, useAppSelector } from "../services/app/hooks";
import {
  removeMessQrStorage,
  setMessQrStorage,
} from "../services/app/features/mess";
import { useFetchMessOrderId } from "../services/auth/messSignIn";

export const MessQrProfile = () => {
  const messQrData = useAppSelector((state) => state.messQr);
  const dispatch = useAppDispatch();

  const [showPasswordContent, setShowPasswordContent] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [passwordDialogVisible, setPasswordDialogVisible] = useState(false);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);

  const { fetchOrderId, loading, isError, error, isSuccess } =
    useFetchMessOrderId();

  const handleRefreshQr = async () => {
    if (messQrData.password === null) {
      const { order_id, mess_name, name, roll_no } = await fetchOrderId(
        messQrData.email,
        password
      );

      dispatch(
        setMessQrStorage({
          order_id,
          mess_name,
          name,
          roll_no,
          email: messQrData.email,
        })
      );
    } else {
      const { order_id, mess_name, name, roll_no } = await fetchOrderId(
        messQrData.email,
        messQrData.password
      );

      dispatch(
        setMessQrStorage({
          order_id,
          mess_name,
          name,
          roll_no,
          email: messQrData.email,
        })
      );
    }
  };

  const handleGetPassword = () => {
    setPasswordDialogVisible(true);
  };

  useEffect(() => {
    if (isError) {
      setErrorDialogVisible(false);
    }
  }, [isError]);

  return (
    <View style={{ marginTop: 30, width: "80%", alignItems: "center" }}>
      <Text style={styles.title}>Mess Profile</Text>

      <View style={{ width: "100%", marginTop: 20 }}>
        <Text style={styles.subtitle}>Name</Text>
        <Text style={{ fontSize: 15, marginTop: 5 }}>{messQrData.name}</Text>
      </View>

      <View style={{ width: "100%", marginTop: 20 }}>
        <Text style={styles.subtitle}>Roll No.</Text>
        <Text style={{ fontSize: 15, marginTop: 5 }}>{messQrData.roll_no}</Text>
      </View>

      <View style={{ width: "100%", marginTop: 20 }}>
        <Text style={styles.subtitle}>Email</Text>
        <Text style={{ fontSize: 15, marginTop: 5 }}>{messQrData.email}</Text>
      </View>

      <View style={{ width: "100%", marginTop: 30 }}>
        <Text style={styles.subtitle}>Password</Text>
        {messQrData.password !== null ? (
          <>
            {!showPasswordContent ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 15 }}>
                  &#8226;{"  "}&#8226;{"  "}&#8226;{"  "}&#8226;{"  "}&#8226;
                  {"  "}&#8226;{"  "}&#8226;{"  "}&#8226;
                </Text>
                <Button
                  onPress={() => {
                    LocalAuthentication.authenticateAsync({
                      promptMessage: "Verify to show password.",
                    }).then((res) => {
                      if (res.success) {
                        setShowPasswordContent(true);
                      }
                    });
                  }}
                >
                  <Text style={{ textDecorationLine: "underline" }}>Show</Text>
                </Button>
              </View>
            ) : (
              <Text style={{ fontSize: 15, marginTop: 5 }}>
                {messQrData.password}
              </Text>
            )}
          </>
        ) : (
          <Text style={{ fontSize: 15, marginTop: 5 }}>
            Your password is not saved.
          </Text>
        )}
      </View>

      <View style={{ width: "100%", marginTop: 20 }}>
        <Text style={styles.subtitle}>Pass ID</Text>
        <Text style={{ fontSize: 15, marginTop: 5 }}>
          {messQrData.order_id}
        </Text>
      </View>

      <View
        style={{
          marginTop: 30,
          marginBottom: 50,
          flexDirection: "row",
        }}
      >
        <Button
          mode="contained"
          onPress={() => {
            if (messQrData.password === null) {
              handleGetPassword();
            } else {
              handleRefreshQr();
            }
          }}
          loading={messQrData.loading || loading}
          style={{ marginRight: 5, flex: 1 }}
        >
          Refresh QR
        </Button>
        <Button
          mode="outlined"
          onPress={() => dispatch(removeMessQrStorage())}
          loading={messQrData.loading}
          style={{ marginLeft: 5, flex: 1 }}
        >
          Clear Mess
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={passwordDialogVisible}
          style={{ backgroundColor: "#ffffff" }}
        >
          <Dialog.Title style={{ fontSize: 20 }}>Enter Password</Dialog.Title>
          <Dialog.Content>
            <View>
              <TextInput
                mode="outlined"
                label="Password"
                // style={styles.textInput}
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
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setPasswordDialogVisible(false);
                setPassword("");
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                handleRefreshQr();
                setPasswordDialogVisible(false);
              }}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={errorDialogVisible}
          style={{ backgroundColor: "#ffffff" }}
        >
          <Dialog.Title style={{ fontSize: 20 }}>Error</Dialog.Title>
          <Dialog.Content>
            <Text style={{ fontSize: 15 }}>{error}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setErrorDialogVisible(false);
              }}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: "8%",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
});
