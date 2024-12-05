import React from "react";
import {
  Keyboard,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MerriWeatherText } from "@/components/fonts";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

interface Props {
  title: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const Header = (props: Props) => {
  const { title, rightElement, leftElement, style } = props;
  return (
    <Pressable style={[styles.header, style]} onPress={Keyboard.dismiss}>
      {leftElement || <View style={styles.emptyIcon} />}
      <MerriWeatherText style={styles.headerTitle} type="bold">
        {title}
      </MerriWeatherText>
      {rightElement || <View style={styles.emptyIcon} />}
    </Pressable>
  );
};

export const HeaderBack = (props: Omit<Props, "leftElement">) => {
  const { title, rightElement, style, color = Colors.raisinBlack } = props;

  const router = useRouter();
  return (
    <Pressable style={[styles.header, style]} onPress={Keyboard.dismiss}>
      <TouchableOpacity onPress={router.back} style={styles.back}>
        <Ionicons name={"chevron-back"} size={24} color={color} />
      </TouchableOpacity>
      <MerriWeatherText style={[styles.headerTitle, { color }]} type="bold">
        {title}
      </MerriWeatherText>
      {rightElement || <View style={styles.emptyIcon} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.darkCharcoal,
  },
  back: {
    padding: 20,
    margin: -20,
  },
  emptyIcon: {
    width: 24,
    aspectRatio: 1,
  },
});

export default Header;
