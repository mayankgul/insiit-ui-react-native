import { useEffect, useState } from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import {
  removeMessQrStorage,
  setMessQrStorage,
} from "../../services/app/features/mess";
import { useFetchMessOrderId } from "../../services/auth/mess";

export const MessQrProfile = () => {
  const colorScheme = useColorScheme();

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
          password: messQrData.password,
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
      <Text
        style={[
          styles.title,
          colorScheme === "light"
            ? { color: "#000000" }
            : { color: "#ffffffe2" },
        ]}
      >
        Mess Profile
      </Text>

      <View style={{ width: "100%", marginTop: 20 }}>
        <Text
          style={[
            styles.subtitle,
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          Name
        </Text>
        <Text
          style={[
            { fontSize: 15, marginTop: 5 },
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          {messQrData.name}
        </Text>
      </View>

      <View style={{ width: "100%", marginTop: 20 }}>
        <Text
          style={[
            styles.subtitle,
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          Roll No.
        </Text>
        <Text
          style={[
            { fontSize: 15, marginTop: 5 },
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          {messQrData.roll_no}
        </Text>
      </View>

      <View style={{ width: "100%", marginTop: 20 }}>
        <Text
          style={[
            styles.subtitle,
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          Email
        </Text>
        <Text
          style={[
            { fontSize: 15, marginTop: 5 },
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          {messQrData.email}
        </Text>
      </View>

      <View style={{ width: "100%", marginTop: 30 }}>
        <Text
          style={[
            styles.subtitle,
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          Password
        </Text>
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
                <Text
                  style={[
                    { fontSize: 15 },
                    colorScheme === "light"
                      ? { color: "#000000" }
                      : { color: "#ffffffe2" },
                  ]}
                >
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
                  <Text
                    style={[
                      { textDecorationLine: "underline" },
                      colorScheme === "light"
                        ? { color: "#000000" }
                        : { color: "#ffffffe2" },
                    ]}
                  >
                    Show
                  </Text>
                </Button>
              </View>
            ) : (
              <Text style={{ fontSize: 15, marginTop: 5 }}>
                {messQrData.password}
              </Text>
            )}
          </>
        ) : (
          <Text
            style={[
              { fontSize: 15, marginTop: 5 },
              colorScheme === "light"
                ? { color: "#000000" }
                : { color: "#ffffffe2" },
            ]}
          >
            Your password is not saved.
          </Text>
        )}
      </View>

      <View style={{ width: "100%", marginTop: 20 }}>
        <Text
          style={[
            styles.subtitle,
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          Pass ID
        </Text>
        <Text
          style={[
            { fontSize: 15, marginTop: 5 },
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
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
          style={{
            marginRight: 10,
            flex: 1,
            backgroundColor: colorScheme === "light" ? "#000000" : "#3f3f3f",
          }}
        >
          Refresh QR
        </Button>
        <Button
          mode="outlined"
          onPress={() => dispatch(removeMessQrStorage())}
          loading={messQrData.loading}
          style={{
            flex: 1,
            borderColor: colorScheme === "light" ? "#000000" : "#ffffffe2",
          }}
          textColor={colorScheme === "light" ? "#000000" : "#ffffffe2"}
        >
          Remove QR
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
