import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { backgroundColor: "#ffffff", flex: 1, paddingTop: 70 },
  image: {
    width: 300,
    height: 300,
  },
  imageContainer: {
    alignItems: "center",
  },
  textContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    // fontFamily: "Roboto",
  },
  subtitle: {
    fontSize: 20,
    marginTop: 10,
    // fontFamily: "Roboto",
    fontStyle: "italic",
  },
  text: {
    fontSize: 15,
    marginTop: 10,
    // fontFamily: "Roboto",
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  loginButton: {
    justifyContent: "center",
    width: "65%",
  },
  loginButtonText: {
    fontSize: 15,
    // fontFamily: "Roboto",
  },
  skipButton: {
    marginTop: 10,
  },
  skipButtonText: {
    fontSize: 13,
    // fontFamily: "Roboto",
    // textDecorationLine: "underline",
  },
});
