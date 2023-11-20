import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useResetMessPassword } from "../services/auth/messSignIn";
import { StackActions, useNavigation } from "@react-navigation/native";

export const MessForgotPasswordScreen = () => {
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
        <View style={styles.container}>
          <Text style={styles.title}>Enter OTP sent to</Text>
          <Text style={styles.subtitle}>{email}</Text>

          <View style={styles.textInputContainer}>
            <TextInput
              mode="outlined"
              label="OTP"
              style={styles.textInput}
              value={otp}
              onChangeText={(text) => setOtp(text)}
              left={<TextInput.Icon icon="key-variant" />}
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              mode="outlined"
              label="New Password"
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

          <View style={styles.textInputContainer}>
            <TextInput
              mode="outlined"
              label="Confirm Password"
              style={styles.textInput}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={!showConfirmPassword}
              left={<TextInput.Icon icon="dots-horizontal" />}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? "eye-off" : "eye"}
                  onPress={() => setShowConfirmPassword((show) => !show)}
                />
              }
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => handleResetPassword()}
              loading={loading}
            >
              Set Password
            </Button>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 17,
              marginBottom: "8%",
            }}
          >
            Enter your roll no. and email
          </Text>

          <View style={styles.textInputContainer}>
            <TextInput
              mode="outlined"
              label="Roll No."
              style={styles.textInput}
              value={rollNo}
              onChangeText={(text) => setRollNo(text)}
              left={<TextInput.Icon icon="badge-account-horizontal-outline" />}
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              mode="outlined"
              label="Email ID"
              style={styles.textInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
              left={<TextInput.Icon icon="at" />}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={async () => await handleSendOtp()}
              loading={loading}
            >
              Send OTP
            </Button>
          </View>
        </View>
      )}

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>{isPasswordSet ? "Success" : "Error"}</Dialog.Title>
          <Dialog.Content>
            <>
              {isError ? (
                <>
                  {!otpSent ? (
                    <>
                      {error === "User not found" ? (
                        <Text>Your roll number and email ID do not match.</Text>
                      ) : error === "Something went wrong" ||
                        error === "Could not send OTP" ? (
                        <Text>
                          Could not send OTP. The mess servers are busy. Please
                          try again in sometime.
                        </Text>
                      ) : (
                        <Text>
                          An error occurred, could not send OTP. Please try
                          again later.
                        </Text>
                      )}
                    </>
                  ) : (
                    <>
                      {error === "OTP is invalid" ? (
                        <Text>
                          You have entered an incorrect OTP. Please re-enter the
                          correct OTP and try again.
                        </Text>
                      ) : error === "Could not reset password" ||
                        error === "Something went wrong" ? (
                        <Text>
                          Could not reset password. The mess servers are busy.
                          Please try again.
                        </Text>
                      ) : (
                        <Text>
                          An error occurred, could not reset password. Please
                          try again later.
                        </Text>
                      )}
                    </>
                  )}
                </>
              ) : (
                <Text>
                  Your password has been reset successfully. Please proceed to
                  login.
                </Text>
              )}
            </>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
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
    backgroundColor: "#ffffff",
    paddingTop: "8%",
    alignItems: "center",
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
    marginTop: 5,
  },
  textInput: {
    backgroundColor: "transparent",
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    width: "50%",
  },
});
