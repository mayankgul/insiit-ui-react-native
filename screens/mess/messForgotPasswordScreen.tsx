import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  useColorScheme,
} from "react-native";
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  TextInput,
} from "react-native-paper";
import { useResetMessPassword } from "../../services/auth/mess";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export const MessForgotPasswordScreen = () => {
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    loading,
    isError,
    error,
    sendOtp,
    resetPassword,
    setIsError,
    setError,
  } = useResetMessPassword();

  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    if (isError) {
      setDialogVisible(true);
    }
  }, [isError]);

  useEffect(() => {
    if (isPasswordSet) {
      setDialogVisible(true);
    }
  });

  const handleSendOtp = async () => {
    const sent = await sendOtp(rollNo, email);
    setOtpSent(sent);
  };

  const handleResetPassword = async () => {
    const set = await resetPassword(otp, password);
    setIsPasswordSet(set);
  };

  return (
    <>
      {otpSent ? (
        <Animated.ScrollView
          style={[
            styles.container,
            colorScheme === "light"
              ? { backgroundColor: "#ffffff" }
              : { backgroundColor: "#202020" },
          ]}
          contentContainerStyle={{ alignItems: "center" }}
          entering={FadeIn}
        >
          <Text
            style={[
              styles.title,
              colorScheme === "light"
                ? { color: "#000000" }
                : { color: "#ffffffe2" },
            ]}
          >
            Enter OTP sent to
          </Text>
          <Text
            style={[
              styles.subtitle,
              colorScheme === "light"
                ? { color: "#000000" }
                : { color: "#ffffffe2" },
            ]}
          >
            {email}
          </Text>

          <View style={styles.textInputContainer}>
            <TextInput
              mode="outlined"
              outlineColor={colorScheme === "light" ? "#000000" : "#ffffffbb"}
              activeOutlineColor={
                colorScheme === "light" ? "#000000" : "#ffffffbb"
              }
              placeholderTextColor={
                colorScheme === "light" ? "#000000" : "#ffffffe2"
              }
              textColor={colorScheme === "light" ? "#000000" : "#ffffff"}
              placeholder="OTP"
              style={styles.textInput}
              value={otp}
              onChangeText={(text) => setOtp(text)}
              keyboardType="numeric"
              left={
                <TextInput.Icon
                  icon={({ size, color }) => (
                    <Image
                      source={
                        colorScheme === "light"
                          ? require("../../assets/icons-light/key-outline-icon.png")
                          : require("../../assets/icons-dark/key-outline-icon.png")
                      }
                      style={{ width: size + 2, height: size + 2 }}
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
              activeOutlineColor={
                colorScheme === "light" ? "#000000" : "#ffffffbb"
              }
              placeholderTextColor={
                colorScheme === "light" ? "#000000" : "#ffffffe2"
              }
              textColor={colorScheme === "light" ? "#000000" : "#ffffff"}
              placeholder="New Password"
              style={styles.textInput}
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
                backgroundColor:
                  colorScheme === "light" ? "#000000" : "#ffffff",
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

          <View style={styles.textInputContainer}>
            <TextInput
              mode="outlined"
              outlineColor={colorScheme === "light" ? "#000000" : "#ffffffbb"}
              activeOutlineColor={
                colorScheme === "light" ? "#000000" : "#ffffffbb"
              }
              placeholderTextColor={
                colorScheme === "light" ? "#000000" : "#ffffffe2"
              }
              textColor={colorScheme === "light" ? "#000000" : "#ffffff"}
              placeholder="Confirm Password"
              style={styles.textInput}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={!showConfirmPassword}
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
                backgroundColor:
                  colorScheme === "light" ? "#000000" : "#ffffff",
                borderWidth: 1,
                borderRadius: 5,
                height: 56,
                width: 50,
                margin: 0,
                marginLeft: 7,
              }}
              icon={({ size, color }) => {
                if (showConfirmPassword) {
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
              onPress={() => setShowConfirmPassword((show) => !show)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => handleResetPassword()}
              loading={loading}
              style={{
                backgroundColor:
                  colorScheme === "light" ? "#000000" : "#3f3f3f",
              }}
            >
              <Text style={{ color: "#ffffff" }}>Set Password</Text>
            </Button>
          </View>
        </Animated.ScrollView>
      ) : (
        <Animated.ScrollView
          style={[
            styles.container,
            colorScheme === "light"
              ? { backgroundColor: "#ffffff" }
              : { backgroundColor: "#202020" },
          ]}
          contentContainerStyle={{ alignItems: "center" }}
          exiting={FadeOut}
        >
          <Text
            style={[
              {
                fontSize: 17,
                marginBottom: "7%",
              },
              colorScheme === "light"
                ? {
                    color: "#000000",
                  }
                : { color: "#ffffffe2" },
            ]}
          >
            Enter your roll no. and email
          </Text>

          <View style={styles.textInputContainer}>
            <TextInput
              mode="outlined"
              outlineColor={colorScheme === "light" ? "#000000" : "#ffffffbb"}
              activeOutlineColor={
                colorScheme === "light" ? "#000000" : "#ffffffbb"
              }
              placeholderTextColor={
                colorScheme === "light" ? "#000000" : "#ffffffe2"
              }
              textColor={colorScheme === "light" ? "#000000" : "#ffffff"}
              placeholder="Roll No."
              style={styles.textInput}
              value={rollNo}
              onChangeText={(text) => setRollNo(text)}
              keyboardType="numeric"
              left={
                <TextInput.Icon
                  icon={({ size, color }) => (
                    <Image
                      source={
                        colorScheme === "light"
                          ? require("../../assets/icons-light/id-card-icon.png")
                          : require("../../assets/icons-dark/id-card-icon.png")
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
              activeOutlineColor={
                colorScheme === "light" ? "#000000" : "#ffffffbb"
              }
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

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={async () => await handleSendOtp()}
              loading={loading}
              style={{
                backgroundColor:
                  colorScheme === "light" ? "#000000" : "#3f3f3f",
              }}
            >
              <Text style={{ color: "#ffffff" }}>Send OTP</Text>
            </Button>
          </View>
        </Animated.ScrollView>
      )}

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => {
            if (otpSent && isError) {
              if (error === "OTP is invalid") {
                setIsError(false);
                setError("");
                setDialogVisible(false);
              } else {
                setDialogVisible(false);
                navigation.dispatch(StackActions.pop());
              }
            } else if (isError) {
              if (error === "User not found") {
                setIsError(false);
                setError("");
                setDialogVisible(false);
              } else {
                setDialogVisible(false);
                navigation.dispatch(StackActions.pop());
              }
            } else {
              setDialogVisible(false);
              navigation.dispatch(StackActions.pop());
            }
          }}
          style={{
            backgroundColor: colorScheme === "light" ? "#dde1ff" : "#36364c",
          }}
        >
          <Dialog.Title
            style={{ color: colorScheme === "light" ? "#000000" : "#ffffffe2" }}
          >
            {isPasswordSet ? "Success" : "Error"}
          </Dialog.Title>
          <Dialog.Content>
            <>
              {isError ? (
                <>
                  {!otpSent ? (
                    <>
                      {error === "User not found" ? (
                        <Text
                          style={{
                            color:
                              colorScheme === "light" ? "#000000" : "#ffffffe2",
                          }}
                        >
                          Your roll number and email ID do not match.
                        </Text>
                      ) : error === "Something went wrong" ||
                        error === "Could not send OTP" ? (
                        <Text
                          style={{
                            color:
                              colorScheme === "light" ? "#000000" : "#ffffffe2",
                          }}
                        >
                          Could not send OTP. The mess servers are busy. Please
                          try again in sometime.
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color:
                              colorScheme === "light" ? "#000000" : "#ffffffe2",
                          }}
                        >
                          An error occurred, could not send OTP. Please try
                          again later.
                        </Text>
                      )}
                    </>
                  ) : (
                    <>
                      {error === "OTP is invalid" ? (
                        <Text
                          style={{
                            color:
                              colorScheme === "light" ? "#000000" : "#ffffffe2",
                          }}
                        >
                          You have entered an incorrect OTP. Please re-enter the
                          correct OTP and try again.
                        </Text>
                      ) : error === "Could not reset password" ||
                        error === "Something went wrong" ? (
                        <Text
                          style={{
                            color:
                              colorScheme === "light" ? "#000000" : "#ffffffe2",
                          }}
                        >
                          Could not reset password. The mess servers are busy.
                          Please try again.
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color:
                              colorScheme === "light" ? "#000000" : "#ffffffe2",
                          }}
                        >
                          An error occurred, could not reset password. Please
                          try again later.
                        </Text>
                      )}
                    </>
                  )}
                </>
              ) : (
                <Text
                  style={{
                    color: colorScheme === "light" ? "#000000" : "#ffffffe2",
                  }}
                >
                  Your password has been reset successfully. Please proceed to
                  login.
                </Text>
              )}
            </>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              textColor={colorScheme === "light" ? "#000000" : "#ffffffe2"}
              onPress={() => {
                if (otpSent && isError) {
                  if (error === "OTP is invalid") {
                    setIsError(false);
                    setError("");
                    setDialogVisible(false);
                  } else {
                    setDialogVisible(false);
                    navigation.dispatch(StackActions.pop());
                  }
                } else if (isError) {
                  if (error === "User not found") {
                    setIsError(false);
                    setError("");
                    setDialogVisible(false);
                  } else {
                    setDialogVisible(false);
                    navigation.dispatch(StackActions.pop());
                  }
                } else {
                  setDialogVisible(false);
                  navigation.dispatch(StackActions.pop());
                }
              }}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "11%",
  },
  title: {
    fontSize: 17,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "6%",
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
    marginTop: 25,
    width: "60%",
  },
});
