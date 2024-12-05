import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProductCard, { IProduct } from "@/components/ui/ProductCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { GelasioText, NunitoSansText } from "@/components/fonts";
import { faker } from "@faker-js/faker";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/store";

export interface IProductCategory {
  id: string;
  name: string;
  icon: string;
}

const { width } = Dimensions.get("window");

const categories: IProductCategory[] = [
  { id: "1", name: "Apples", icon: "nutrition-outline" },
  { id: "2", name: "Carrots", icon: "leaf-outline" },
  { id: "3", name: "Potatoes", icon: "basket-outline" },
  { id: "4", name: "Tomatoes", icon: "logo-octocat" },
  { id: "5", name: "Cucumbers", icon: "leaf-outline" },
  { id: "6", name: "Bananas", icon: "beaker" },
  { id: "7", name: "Oranges", icon: "beer" },
  { id: "8", name: "Grapes", icon: "water-outline" },
  { id: "9", name: "Peppers", icon: "color-filter-outline" },
  { id: "10", name: "Onions", icon: "pizza-outline" },
  { id: "11", name: "Garlic", icon: "flash-outline" },
  { id: "12", name: "Strawberries", icon: "heart-outline" },
  { id: "13", name: "Peaches", icon: "wine-outline" },
  { id: "14", name: "Lettuce", icon: "fast-food-outline" },
  { id: "15", name: "Broccoli", icon: "nutrition-outline" },
];

export const products: IProduct[] = [
  {
    id: "1",
    name: "Fresh Apples",
    price: 120,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Apples",
    quantity: 1,
  },
  {
    id: "2",
    name: "Organic Carrots",
    price: 80,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Carrots",
    quantity: 1,
  },
  {
    id: "3",
    name: "Potatoes",
    price: 50,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Potatoes",
    quantity: 1,
  },
  {
    id: "4",
    name: "Tomatoes",
    price: 70,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Tomatoes",
    quantity: 1,
  },
  {
    id: "5",
    name: "Crispy Cucumbers",
    price: 60,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Cucumbers",
    quantity: 1,
  },
  {
    id: "6",
    name: "Sweet Bananas",
    price: 90,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Bananas",
    quantity: 1,
  },
  {
    id: "7",
    name: "Juicy Oranges",
    price: 100,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Oranges",
    quantity: 1,
  },
  {
    id: "8",
    name: "Red Grapes",
    price: 150,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Grapes",
    quantity: 1,
  },
  {
    id: "9",
    name: "Spicy Peppers",
    price: 40,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Peppers",
    quantity: 1,
  },
  {
    id: "10",
    name: "Fresh Onions",
    price: 30,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Onions",
    quantity: 1,
  },
  {
    id: "11",
    name: "Garlic Bulbs",
    price: 50,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Garlic",
    quantity: 1,
  },
  {
    id: "12",
    name: "Sweet Strawberries",
    price: 200,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Strawberries",
    quantity: 1,
  },
  {
    id: "13",
    name: "Ripe Peaches",
    price: 120,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Peaches",
    quantity: 1,
  },
  {
    id: "14",
    name: "Crisp Lettuce",
    price: 70,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Lettuce",
    quantity: 1,
  },
  {
    id: "15",
    name: "Green Broccoli",
    price: 100,
    image: faker.image.urlPicsumPhotos({ width: 314, height: 400, blur: 0 }),
    category: "Broccoli",
    quantity: 1,
  },
];

const HomeScreen = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [category, setCategory] = useState<IProductCategory | null>(null);
  const renderCategory: ListRenderItem<IProductCategory> = ({ item }) => {
    const selected = category?.id === item.id;
    return (
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => setCategory(item)}
      >
        <View
          style={[
            styles.categoryIcon,
            selected && { backgroundColor: Colors.darkCharcoal },
          ]}
        >
          <Ionicons
            // @ts-ignore
            name={item.icon}
            size={24}
            color={selected ? Colors.white : Colors.philippineGray}
          />
        </View>
        <NunitoSansText
          type={selected ? "bold" : "default"}
          style={[
            styles.categoryName,
            selected && { color: Colors.darkCharcoal },
          ]}
        >
          {item.name}
        </NunitoSansText>
      </TouchableOpacity>
    );
  };

  const renderProduct: ListRenderItem<IProduct> = ({ item }) => (
    <ProductCard data={item} style={styles.product} />
  );

  useEffect(() => {
    console.log(JSON.stringify(user, null, 2));
  }, [user]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
        <GelasioText style={styles.headerTitle}>
          Harvest{"\n"}
          <GelasioText type="bold">HUB</GelasioText>
        </GelasioText>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => router.navigate("cart")}
        >
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        style={styles.categoriesList}
        contentContainerStyle={styles.categoriesListContainer}
      />
      {/* Products */}
      <FlatList
        data={products}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.productsListWrapper}
        contentContainerStyle={styles.productsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerIcon: {
    padding: 20,
    margin: -20,
  },
  headerTitle: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.darkCharcoal,
  },
  categoriesList: {
    height: 120,
  },
  categoriesListContainer: {
    gap: 25,
    paddingHorizontal: 20,
  },
  categoryButton: {
    gap: 10,
    alignItems: "center",
  },
  categoryName: {
    color: Colors.spanishGray,
  },
  categoryIcon: {
    backgroundColor: Colors.cultured,
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  productsList: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    gap: 15,
  },
  productsListWrapper: {
    gap: 21,
  },
  product: {
    flex: 1 / 2,
  },
});

export default HomeScreen;
