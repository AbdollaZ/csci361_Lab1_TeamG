import React, { forwardRef } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { NunitoSansText } from "@/components/fonts";
import MaskInput, { MaskInputProps } from "react-native-mask-input";

interface Props extends TextInputProps {
  value: string;
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
}

type InputProps =
  | ({
      mask: MaskInputProps["mask"];
      onChangeText: MaskInputProps["onChangeText"];
    } & Omit<Props, "onChangeText">)
  | ({ mask?: never } & Props);

const EditableInput = forwardRef<TextInput, InputProps>((props, ref) => {
  const { label, error, containerStyle, ...args } = props;
  const onPress = () => {
    // @ts-ignore
    ref.current?.focus();
  };
  return (
    <Pressable style={[styles.container, containerStyle]} onPress={onPress}>
      <NunitoSansText style={styles.label}>{label}</NunitoSansText>
      <MaskInput
        ref={ref}
        {...args}
        pointerEvents={"none"}
        placeholderTextColor={Colors.philippineSilver}
      />
      {error && (
        <NunitoSansText style={styles.errorText}>{error}</NunitoSansText>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: Colors.white,
    shadowColor: "#000", // Цвет тени
    shadowOffset: { width: 0, height: 10 }, // Смещение тени
    shadowOpacity: 0.1, // Прозрачность тени
    shadowRadius: 10, // Радиус размытия тени
    elevation: 5, // Для Android — добавляет тень с использованием elevation
    gap: 5,
  },
  label: {
    fontSize: 12,
    color: Colors.gray,
  },
  value: {
    fontSize: 14,
    color: Colors.darkCharcoal,
    fontFamily: "NunitoSans-SemiBold",
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    color: Colors.fireOpal,
  },
});

export default EditableInput;
