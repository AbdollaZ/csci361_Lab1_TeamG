import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { NunitoSansText } from "@/components/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props extends TouchableOpacityProps {
  label: string;
  value?: string;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  rightElement?: ReactNode;
}

const SectionItem = (props: Props) => {
  const { label, value, style, labelStyle, valueStyle, rightElement, ...args } =
    props;

  return (
    <TouchableOpacity style={[styles.container, style]} {...args}>
      <View style={{ flex: 1 }}>
        <NunitoSansText type={"bold"} style={[styles.label, labelStyle]}>
          {label}
        </NunitoSansText>
        {value ? (
          <NunitoSansText type={"semiBold"} style={[styles.value, valueStyle]}>
            {value}
          </NunitoSansText>
        ) : null}
      </View>
      {rightElement || (
        <Ionicons
          name={"chevron-forward"}
          color={Colors.raisinBlack}
          size={20}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gainsboro,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    color: Colors.darkCharcoal,
  },
  value: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 8,
  },
});

export default SectionItem;
