import { ScrollView, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../services/app/hooks";
import { SplashScreen } from "./SplashScreen";
import { MessQrSignIn } from "../components/MessQrSignIn";
import { MessQrDisplay } from "../components/messQrDisplay";
import { MessQrProfile } from "../components/messQrProfile";
import { useEffect } from "react";
import { getMessQrStorage } from "../services/app/features/mess";

export const MessQRScreen = () => {
  const dispatch = useAppDispatch();
  const messQrData = useAppSelector((state) => state.messQr);

  useEffect(() => {
    dispatch(getMessQrStorage());
  }, []);

  if (messQrData.loading) {
    return <SplashScreen />;
  }

  if (messQrData.order_id !== null) {
    return (
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}
      >
        <MessQrDisplay
          order_id={messQrData.order_id}
          mess_name={messQrData.mess_name}
        />

        <MessQrProfile />
      </ScrollView>
    );
  }

  return <MessQrSignIn />;
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: "8%",
  },
  container: { alignItems: "center" },
});
