import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { NunitoSansText } from "@/components/fonts";
import { Checkbox } from "expo-checkbox";

export interface IAddress {
  id: string;
  address: string;
  name: string;
}
interface Props {
  address: IAddress;
  selected: boolean;
  setSelected: () => void;
}
const AddressItem = (props: Props) => {
  const { address, selected, setSelected } = props;
  const router = useRouter();
  const refCheck = useRef(null);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        ref={refCheck}
        onPress={setSelected}
      >
        <Checkbox
          color={Colors.darkCharcoal}
          style={styles.checkbox}
          value={selected}
        />
        <NunitoSansText style={styles.checkboxText}>
          Use as the shipping address
        </NunitoSansText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addressItem}
        onPress={() => router.navigate("/address")}
      >
        <View style={styles.header}>
          <NunitoSansText type={"bold"} style={styles.name}>
            {address.name}
          </NunitoSansText>
        </View>
        <View style={styles.body}>
          <NunitoSansText style={styles.address}>
            {address.address}
          </NunitoSansText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    // margin: 8,
  },
  checkboxText: {
    fontSize: 18,
    color: Colors.darkCharcoal,
  },
  addressItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: "#000", // Цвет тени
    shadowOffset: { width: 0, height: 10 }, // Смещение тени
    shadowOpacity: 0.1, // Прозрачность тени
    shadowRadius: 10, // Радиус размытия тени
    elevation: 5, // Для Android — добавляет тень с использованием elevation
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.antiFlashWhite,
  },
  name: {
    color: Colors.darkCharcoal,
    fontSize: 18,
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  address: {
    fontSize: 14,
    lineHeight: 25,
    color: Colors.gray,
  },
});

export default AddressItem;
