import React, { ForwardedRef, forwardRef, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TextInputProps,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { NunitoSansText } from "@/components/fonts";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface InputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  label?: string;
  error?: string;
  style?: object;
  inputStyle?: InputProps["style"];
}

export const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<TextInput>) => {
    const { label, error, style, inputStyle = styles.input, ...args } = props;
    const [hiddenPassword, setHiddenPassword] = useState(args.secureTextEntry);
    const onPress = () => {
      // @ts-ignore
      ref.current?.focus();
    };
    return (
      <Pressable style={[styles.container, style]} onPress={onPress}>
        {label && <NunitoSansText style={styles.label}>{label}</NunitoSansText>}
        <TextInput
          ref={ref}
          style={[inputStyle, error && styles.inputError, styles.text]}
          placeholderTextColor="#888"
          pointerEvents={"none"}
          {...args}
          secureTextEntry={hiddenPassword}
        />
        {args.secureTextEntry !== undefined ? (
          <TouchableOpacity
            style={styles.password}
            onPress={() => setHiddenPassword((prev) => !prev)}
          >
            {hiddenPassword ? (
              <Ionicons name={"eye"} color={Colors.raisinBlack} size={20} />
            ) : (
              <Ionicons name={"eye-off"} color={Colors.raisinBlack} size={20} />
            )}
          </TouchableOpacity>
        ) : null}
        {error && (
          <NunitoSansText style={styles.errorText}>{error}</NunitoSansText>
        )}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: Colors.philippineGray,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: Colors.fireOpal,
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    color: Colors.fireOpal,
  },
  password: {
    position: "absolute",
    right: 0,
    top: "50%",
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  text: {
    color: Colors.darkCharcoal,
    fontFamily: "NunitoSans-Regular",
  },
});
