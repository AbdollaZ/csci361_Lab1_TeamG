import React, { useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { NunitoSansText } from "@/components/fonts";
import { Picker, PickerProps } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props extends TouchableOpacityProps {
  label: string;
  value?: string;
  placeholder?: string;
  data: [string, string][];
  onChangeValue: (value: string) => void;
  error: string;
}

const Select = (props: Props) => {
  const {
    label,
    value,
    data,
    error,
    placeholder,
    style,
    onChangeValue,
    ...args
  } = props;
  const pickerRef = useRef<Picker<typeof data>>(null);

  return (
    <>
      <TouchableOpacity
        style={[styles.container, style, error && styles.error]}
        {...args}
      >
        <View style={{ flex: 1 }}>
          <NunitoSansText style={[styles.label, error && styles.errorText]}>
            {label}
          </NunitoSansText>
          <NunitoSansText
            style={[styles.value, error && styles.errorText]}
            type={"semiBold"}
          >
            {value || placeholder}
          </NunitoSansText>
        </View>
        <Ionicons
          name={"chevron-down"}
          color={error ? Colors.fireOpal : Colors.raisinBlack}
          size={20}
        />
      </TouchableOpacity>
      {error && (
        <NunitoSansText style={[styles.errorText, styles.errorMessage]}>
          {error}
        </NunitoSansText>
      )}
      {/*/!*@ts-ignore*!/*/}
      {/*<Picker*/}
      {/*  ref={pickerRef}*/}
      {/*  selectedValue={[value]}*/}
      {/*  onValueChange={(itemValue: string[], itemIndex) =>*/}
      {/*    onChangeValue(itemValue[0])*/}
      {/*  }*/}
      {/*>*/}
      {/*  {data.map(([label, value]) => (*/}
      {/*    <Picker.Item key={value} label={label} value={value} />*/}
      {/*  ))}*/}
      {/*</Picker>*/}
    </>
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
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: Colors.raisinBlack,
  },
  errorText: {
    color: Colors.fireOpal,
  },
  error: {
    borderColor: Colors.fireOpal,
  },
  errorMessage: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default Select;
