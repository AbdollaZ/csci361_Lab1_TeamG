import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { NunitoSansText } from "@/components/fonts";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { HeaderBack } from "@/components/ui/Header";
import OrderItem, { IOrder } from "@/components/ui/OrderItem";

const orders: IOrder[] = [
  {
    id: "1",
    date: "2024-12-01T10:30:00Z",
    quantity: 3,
    total: "$75",
    status: "delivered",
  },
  {
    id: "2",
    date: "2024-11-28T14:15:00Z",
    quantity: 1,
    total: "$25",
    status: "canceled",
  },
  {
    id: "3",
    date: "2024-11-30T08:45:00Z",
    quantity: 5,
    total: "$125",
    status: "processing",
  },
  {
    id: "4",
    date: "2024-12-02T16:00:00Z",
    quantity: 2,
    total: "$50",
    status: "delivered",
  },
  {
    id: "5",
    date: "2024-11-25T12:00:00Z",
    quantity: 4,
    total: "$100",
    status: "canceled",
  },
  {
    id: "6",
    date: "2024-12-01T19:30:00Z",
    quantity: 6,
    total: "$180",
    status: "processing",
  },
];

const Delivered = () => {
  const data = orders.filter((i) => i.status === "delivered");
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.orders}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  );
};

const Processing = () => {
  const data = orders.filter((i) => i.status === "processing");
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.orders}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  );
};

const Canceled = () => {
  const data = orders.filter((i) => i.status === "canceled");
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.orders}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  );
};
const renderScene = SceneMap({
  delivered: Delivered,
  processing: Processing,
  canceled: Canceled,
});

const routes = [
  { key: "delivered", title: "Delivered" },
  { key: "processing", title: "Processing" },
  { key: "canceled", title: "Canceled" },
];

const Orders = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: Colors.darkCharcoal,
      }} // Указатель активной вкладки
      style={{ backgroundColor: Colors.white }} // Цвет фона вкладок
      activeColor={Colors.darkCharcoal} // Цвет текста активной вкладки
      inactiveColor={Colors.gray} // Цвет текста неактивных вкладок
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={"Orders"} style={styles.header} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
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
    paddingHorizontal: 20,
  },
  orders: {
    flexGrow: 1,
    paddingVertical: 25,
    paddingHorizontal: 20,
    gap: 25,
  },
});

export default Orders;
