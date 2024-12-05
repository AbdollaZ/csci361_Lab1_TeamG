import Header from "@/components/ui/Header";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GelasioText } from "@/components/fonts";
import { products } from "@/app/(tabs)/home";
import FavoriteItem from "@/components/ui/FavoriteItem";
import { Colors } from "@/constants/Colors";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";

export default function FavoritesScreen() {
  const router = useRouter();
  const onCart = () => {
    router.navigate("cart");
  };
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header
        style={styles.header}
        title={"Favorites"}
        leftElement={
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search-outline" size={24} color="black" />
          </TouchableOpacity>
        }
        rightElement={
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
        }
      />
      <FlatList
        contentContainerStyle={styles.scrollView}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FavoriteItem product={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      {products.length ? (
        <View style={styles.footer}>
          <Button
            style={styles.buttonCart}
            title={"Add all to my cart"}
            onPress={onCart}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerIcon: {
    padding: 20,
    margin: -20,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 90,
    gap: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    padding: 20,
    right: 0,
    left: 0,
  },
  buttonCart: {
    flex: 1,
  },
  separator: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.antiFlashWhite,
  },
});
