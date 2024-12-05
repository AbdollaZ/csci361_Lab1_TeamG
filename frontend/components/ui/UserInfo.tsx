import React from "react";
import { View, Image, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { faker } from "@faker-js/faker";
import { Colors } from "@/constants/Colors";
import { NunitoSansText } from "@/components/fonts";
import { useAppSelector } from "@/store";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const UserInfo = (props: Props) => {
  const { style } = props;
  const user = useAppSelector((state) => state.auth.user);

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: faker.image.avatar() }}
        style={styles.avatar}
        resizeMode="cover"
      />
      <View style={styles.textContent}>
        <NunitoSansText style={styles.name} type={"bold"}>
          {user.name + " " + user.surname}
        </NunitoSansText>
        <NunitoSansText style={styles.email}>{user.email}</NunitoSansText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    aspectRatio: 1,
    borderRadius: 50,
  },
  textContent: {
    gap: 10,
  },
  name: {
    color: Colors.darkCharcoal,
    fontSize: 20,
  },
  email: {
    fontSize: 14,
    color: Colors.gray,
  },
});

export default UserInfo;
