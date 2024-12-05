import React, { Dispatch, SetStateAction } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { NunitoSansText } from "@/components/fonts";
import utils from "@/constants/utils";

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  quantity: number;
}

const Counter = (props: Props) => {
  const { value, setValue, quantity } = props;

  const disabledAdd = value + 1 > quantity;
  const disabledRemove = value - 1 < 1;

  const onAdd = () => {
    setValue((prev) => {
      if (prev < quantity) {
        return prev + 1;
      }
      return prev;
    });
  };

  const onRemove = () => {
    setValue((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, disabledRemove && { opacity: 0.2 }]}
        onPress={onRemove}
      >
        <Ionicons name={"remove"} size={24} color={Colors.darkCharcoal} />
      </TouchableOpacity>
      <NunitoSansText type={"semiBold"} style={styles.value}>
        {utils.prettyPrice(value)}
      </NunitoSansText>
      <TouchableOpacity
        style={[styles.button, disabledAdd && { opacity: 0.2 }]}
        onPress={onAdd}
      >
        <Ionicons name={"add"} size={24} color={Colors.darkCharcoal} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  button: {
    backgroundColor: Colors.chineseWhite,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  value: {
    fontSize: 18,
    color: Colors.darkCharcoal,
  },
});

export default Counter;
