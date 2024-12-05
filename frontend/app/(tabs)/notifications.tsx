import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import UserInfo from "@/components/ui/UserInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import Header, { HeaderBack } from "@/components/ui/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import Notification, { INotification } from "@/components/ui/Notification";
import { faker } from "@faker-js/faker";

const data: INotification[] = new Array(15).fill(null).map(() => ({
  id: faker.string.uuid(),
  image: faker.image.urlPicsumPhotos(),
  title: faker.word.words(5),
  body: faker.lorem.sentences({ min: 2, max: 5 }),
  read: Boolean(faker.number.int({ min: 0, max: 1 })),
}));

export default function NotificationScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header
        style={styles.header}
        title={"Notifications"}
        leftElement={
          <TouchableOpacity style={styles.search}>
            <Ionicons
              name={"search-outline"}
              color={Colors.darkCharcoal}
              size={24}
            />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Notification item={item} style={styles.notification} />
        )}
        contentContainerStyle={styles.notifications}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: 20,
  },
  search: {
    padding: 20,
    margin: -20,
  },
  notifications: {
    // paddingHorizontal: 20,
  },
  notification: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.antiFlashWhite,
  },
});
