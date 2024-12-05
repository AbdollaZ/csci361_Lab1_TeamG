import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { faker } from "@faker-js/faker";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { GelasioText, NunitoSansText } from "@/components/fonts";
import { IProduct } from "@/components/ui/ProductCard";
import utils from "@/constants/utils";
import Counter from "@/components/ui/Counter";
import Ionicons from "@expo/vector-icons/Ionicons";
import ParralaxScrollView from "@/components/ParallaxScrollView";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/ui/Button";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { HeaderBack } from "@/components/ui/Header";

const { height } = Dimensions.get("window");

interface Props {
  id: number;
}

const product: IProduct = {
  id: faker.string.uuid(),
  category: faker.commerce.product(),
  name: faker.commerce.productName(),
  image: faker.image.urlPicsumPhotos(),
  price: Number(faker.commerce.price()),
  quantity: faker.number.int({ min: 5, max: 10 }),
};

const rating = faker.number.int({ min: 1, max: 5 });
const reviews = faker.number.int({ min: 10, max: 100 });
const description = faker.lorem.text();

const Id = (props: Props) => {
  const { id } = useLocalSearchParams();
  const [favorite, setFavorite] = useState(false);

  const { top } = useSafeAreaInsets();

  const [count, setCount] = useState(1);
  const onCart = () => {};
  const onFavorite = () => {
    setFavorite((prev) => !prev);
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBack
        title={"dsadasds"}
        color={Colors.white}
        style={[styles.header, { top }]}
      />
      <ParralaxScrollView
        style={styles.container}
        headerImage={
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode={"cover"}
            blurRadius={0}
          />
        }
      >
        <StatusBar style={"light"} />
        <View style={styles.content}>
          <GelasioText type={"medium"} style={styles.name}>
            {product.name}
          </GelasioText>
          <View style={styles.priceContainer}>
            <NunitoSansText style={styles.price} type={"bold"}>
              $ {utils.prettyPrice(product.price)}
            </NunitoSansText>
            <Counter
              value={count}
              quantity={product.quantity}
              setValue={setCount}
            />
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name={"star"} color={Colors.yellow} size={24} />
            <NunitoSansText style={styles.rating} type={"bold"}>
              {rating}
            </NunitoSansText>
            <NunitoSansText style={styles.reviews} type={"semiBold"}>
              ({reviews} reviews)
            </NunitoSansText>
          </View>
          <NunitoSansText style={styles.description}>
            {description}
          </NunitoSansText>
        </View>
      </ParralaxScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={onFavorite}
          style={[styles.favorite, favorite && styles.favoriteSelected]}
        >
          <Ionicons
            name={"bookmark-outline"}
            color={favorite ? Colors.white : Colors.darkCharcoal}
            size={24}
          />
        </TouchableOpacity>
        <Button
          title={"Add to cart"}
          onPress={onCart}
          style={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  header: {
    position: "absolute",
    right: 0,
    left: 0,
    zIndex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: height * 0.33,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  content: {
    padding: 25,
    backgroundColor: Colors.white,
  },
  name: {
    fontSize: 24,
    color: Colors.darkCharcoal,
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  price: {
    fontSize: 30,
    color: Colors.darkCharcoal,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  rating: {
    fontSize: 18,
    color: Colors.darkCharcoal,
  },
  reviews: {
    fontSize: 14,
    marginLeft: 10,
    color: Colors.gray,
  },
  description: {
    fontSize: 14,
    color: Colors.graniteGray,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    gap: 15,
    left: 20,
    right: 20,
  },
  favorite: {
    backgroundColor: Colors.antiFlashWhite,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  favoriteSelected: {
    backgroundColor: Colors.darkCharcoal,
  },
  button: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 20,
  },
});

export default Id;
