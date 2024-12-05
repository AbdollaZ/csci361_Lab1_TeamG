import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import { GelasioText, NunitoSansText } from "@/components/fonts";
import { Colors } from "@/constants/Colors";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Картинка на фоне */}
      <Image
        source={require("../assets/images/farm.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <GelasioText style={styles.title} type={"semiBold"}>
            MAKE YOUR
          </GelasioText>
          <GelasioText style={styles.titleBold} type={"bold"}>
            HOME BEAUTIFUL
          </GelasioText>
          <NunitoSansText style={styles.subtitle}>
            The best simple place where you discover most wonderful furnitures
            and make your home beautiful
          </NunitoSansText>
        </View>
        <Button
          title={"Get Started"}
          onPress={() => {
            router.replace("/auth/login");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: Colors.graniteGray,
    marginBottom: 15,
  },
  titleBold: {
    fontSize: 30,
    color: Colors.darkCharcoal,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 35,
    color: Colors.darkCharcoal,
    textAlign: "center",
    marginTop: 35,
  },
  content: {
    zIndex: 2,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
    paddingTop: 40,
    paddingBottom: 250,
  },
});
