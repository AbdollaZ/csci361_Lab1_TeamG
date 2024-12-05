import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { HeaderBack } from "@/components/ui/Header";
import AddressItem, { IAddress } from "@/components/ui/AddressItem";
import { faker } from "@faker-js/faker";

const data = new Array(5).fill(0).map(() => ({
  id: faker.string.uuid(),
  name: faker.word.words(3),
  address: faker.location.streetAddress({ useFullAddress: true }),
}));

const ShippingAddresses = () => {
  const [address, setAddress] = useState<IAddress | null>(null);

  console.log("address", address);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={"Shipping address"} style={styles.header} />
      <FlatList
        contentContainerStyle={styles.addresses}
        data={data}
        renderItem={({ item }) => (
          <AddressItem
            address={item}
            selected={item.id === address?.id}
            setSelected={() => {
              setAddress((prev) => {
                if (prev && prev.id === item.id) {
                  return prev;
                }
                return item;
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  header: {
    padding: 20,
  },
  addresses: {
    flexGrow: 1,
    padding: 20,
    gap: 30,
  },
});

export default ShippingAddresses;
