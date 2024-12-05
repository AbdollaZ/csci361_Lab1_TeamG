import React, { useState } from "react";
import { IProduct } from "@/components/ui/ProductCard";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { NunitoSansText } from "@/components/fonts";
import { Colors } from "@/constants/Colors";
import utils from "@/constants/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import Counter from "@/components/ui/Counter";

interface Props {
  product: IProduct;
}

const CartItem = (props: Props) => {
  const { product } = props;

  const [count, setCount] = useState(1);

  const removeCart = () => {};

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContent}>
        <NunitoSansText type={"semiBold"} style={styles.name}>
          {product.name}
        </NunitoSansText>
        <NunitoSansText type={"bold"} style={styles.price}>
          $ {utils.prettyPrice(product.price)}
        </NunitoSansText>
        <Counter
          value={count}
          setValue={setCount}
          quantity={product.quantity}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.icon} onPress={removeCart}>
          <Ionicons
            name={"close-circle-outline"}
            color={Colors.darkCharcoal}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
  },
  image: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  textContent: {
    flex: 1,
    gap: 8,
  },
  name: {
    fontSize: 14,
    color: Colors.graniteGray,
  },
  price: {
    fontSize: 18,
    color: Colors.darkCharcoal,
  },
  buttons: {
    gap: 10,
    justifyContent: "space-between",
  },
  icon: {
    padding: 10,
    margin: -10,
  },
  addCart: {
    backgroundColor: Colors.chineseWhite,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CartItem;
