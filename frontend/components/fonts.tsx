import React from "react";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "medium" | "semiBold" | "bold" | "link";
};

export function GelasioText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        styles.gelasio,
        type === "default" ? styles.default : undefined,
        type === "medium" ? styles.medium : undefined,
        type === "semiBold" ? styles.semiBold : undefined,
        type === "bold" ? styles.bold : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

export function MerriWeatherText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        styles.merriWeather,
        type === "default" ? styles.default : undefined,
        type === "bold" ? styles.merriWeatherBold : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

export function NunitoSansText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        styles.nunitoSans,
        type === "default" ? styles.default : undefined,
        type === "semiBold" ? styles.semiBold2 : undefined,
        type === "bold" ? styles.bold2 : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
  gelasio: {
    fontFamily: "Gelasio-Regular", // По умолчанию Regular
  },
  medium: {
    fontFamily: "Gelasio-Medium",
  },
  semiBold: {
    fontFamily: "Gelasio-SemiBold",
  },
  bold: {
    fontFamily: "Gelasio-Bold",
  },
  merriWeather: {
    fontFamily: "MerriWeather-Regular",
  },
  merriWeatherBold: {
    fontFamily: "MerriWeather-Bold",
  },
  nunitoSans: {
    fontFamily: "NunitoSans-Regular",
  },
  semiBold2: {
    fontFamily: "NunitoSans-SemiBold",
  },
  bold2: {
    fontFamily: "NunitoSans-Bold",
  },
  default: {
    fontSize: 14, // Общий стиль текста
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
