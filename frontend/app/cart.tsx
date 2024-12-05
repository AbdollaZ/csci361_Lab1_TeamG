import Header, { HeaderBack } from "@/components/ui/Header";
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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GelasioText, NunitoSansText } from "@/components/fonts";
import { products } from "@/app/(tabs)/home";
import FavoriteItem from "@/components/ui/FavoriteItem";
import { Colors } from "@/constants/Colors";
import Button from "@/components/ui/Button";
import CartItem from "@/components/ui/CartItem";

export default function CartScreen() {
  const { bottom } = useSafeAreaInsets();
  const onCart = () => {};
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <HeaderBack style={styles.header} title={"Cart"} />
      <FlatList
        contentContainerStyle={[
          styles.scrollView,
          { paddingBottom: bottom + 150 },
        ]}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem product={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      {products.length ? (
        <View style={[styles.footer, { bottom }]}>
          <View style={styles.total}>
            <NunitoSansText type={"bold"} style={styles.totalText}>
              Total:
            </NunitoSansText>
            <NunitoSansText type={"bold"} style={styles.totalPrice}>
              $ {products.reduce((sum, i) => sum + i.price, 0)}
            </NunitoSansText>
          </View>
          <Button
            style={styles.buttonCart}
            title={"Check out"}
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
    gap: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
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
  total: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    backgroundColor: Colors.white,
  },
  totalText: {
    fontSize: 20,
    color: Colors.gray,
  },
  totalPrice: {
    fontSize: 20,
    color: Colors.darkCharcoal,
  },
});
