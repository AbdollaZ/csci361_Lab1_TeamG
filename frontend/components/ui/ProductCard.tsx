import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { StyleProps } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { faker } from "@faker-js/faker";
import { NunitoSansText } from "@/components/fonts";
import utils from "@/constants/utils";
import { Link, useRouter } from "expo-router";

export interface IProduct {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface Props {
  data: IProduct;
  style?: StyleProps;
}

const ProductCard = (props: Props) => {
  const { data, style } = props;
  const router = useRouter();
  return (
    <View style={[styles.productCard, style]}>
      <TouchableOpacity
        style={styles.productImage}
        onPress={() => {
          router.navigate("/product/[id]", { id: data.id });
        }}
      >
        <Image
          source={{ uri: data.image }}
          style={{ flex: 1 }}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
      <NunitoSansText style={styles.productName}>{data.name}</NunitoSansText>
      <NunitoSansText type={"bold"} style={styles.productPrice}>
        $ {utils.prettyPrice(data.price)}
      </NunitoSansText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    borderRadius: 8,
  },
  productCard: {
    flex: 1,
    backgroundColor: Colors.white,
    gap: 10,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
  },
  productName: {
    fontSize: 14,
    color: Colors.graniteGray,
  },
  productPrice: {
    fontSize: 14,
    color: Colors.darkCharcoal,
  },
});

export default ProductCard;
