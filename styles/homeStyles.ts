import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // opacity: 0.08,
    paddingTop: 20,
    // paddingLeft: 20,
  },
  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    fontStyle: "italic",
    marginBottom: 35,
    marginLeft: 20,
  },
  text: {
    fontSize: 17,
  },
  subText: {
    fontSize: 13,
    marginTop: 2,
    color: "#696969",
  },
  pressableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 25,
    marginLeft: 20,
    marginTop: 15,
  },
});
