import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { faker } from "@faker-js/faker";
import { NunitoSansText } from "@/components/fonts";
import { Colors } from "@/constants/Colors";

export interface INotification {
  id: string;
  title: string;
  body: string;
  image: string;
  read: boolean;
}

interface Props {
  item: INotification;
  style?: StyleProp<ViewStyle>;
}

const Notification = (props: Props) => {
  const { item, style } = props;
  return (
    <TouchableOpacity
      style={[styles.container, style, !item.read && styles.unread]}
    >
      <Image
        source={{ uri: item.image }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.textContent}>
        <NunitoSansText style={styles.title} type={"bold"}>
          {item.title}
        </NunitoSansText>
        <NunitoSansText style={styles.body} numberOfLines={3}>
          {item.body}
        </NunitoSansText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 70,
    aspectRatio: 1,
    borderRadius: 8,
  },
  textContent: {
    flex: 1,
    gap: 10,
  },
  title: {
    color: Colors.darkCharcoal,
    fontSize: 12,
  },
  body: {
    fontSize: 10,
    color: Colors.gray,
    lineHeight: 15,
  },
  unread: {
    backgroundColor: Colors.antiFlashWhite,
  },
});

export default Notification;
