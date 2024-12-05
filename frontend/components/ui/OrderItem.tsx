import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { NunitoSansText } from "@/components/fonts";
import { format } from "date-fns";

export interface IOrder {
  id: string;
  date: string; // Timestamp
  quantity: number;
  total: string; // '$50
  status: string; // 'delivered' | 'canceled' | 'processing'
}

interface Props {
  order: IOrder;
}

const OrderItem = (props: Props) => {
  const { order } = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <NunitoSansText type={"semiBold"} style={styles.orderId}>
          Order №{order.id}
        </NunitoSansText>
        {/*<NunitoSansText style={styles.statusText} type={"semiBold"}>*/}
        {/*  {order.status}*/}
        {/*</NunitoSansText>*/}
      </View>
      <View style={styles.body}>
        <View style={styles.quantityContainer}>
          <NunitoSansText style={styles.quantity} type={"semiBold"}>
            Quantity:{" "}
            <NunitoSansText
              type={"bold"}
              style={{ color: Colors.darkCharcoal }}
            >
              {order.quantity}
            </NunitoSansText>
          </NunitoSansText>
          <NunitoSansText style={styles.quantity} type={"semiBold"}>
            Total Amount:{" "}
            <NunitoSansText
              type={"bold"}
              style={{ color: Colors.darkCharcoal }}
            >
              {order.total}
            </NunitoSansText>
          </NunitoSansText>
        </View>
        <View style={styles.status}>
          <TouchableOpacity style={styles.details}>
            <NunitoSansText type={"semiBold"} style={styles.detailsText}>
              Details
            </NunitoSansText>
          </TouchableOpacity>
          <NunitoSansText style={styles.date}>
            {format(order.date, "PPpp")}
          </NunitoSansText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    shadowColor: "#000", // Цвет тени
    shadowOffset: { width: 0, height: 10 }, // Смещение тени
    shadowOpacity: 0.1, // Прозрачность тени
    shadowRadius: 10, // Радиус размытия тени
    elevation: 5, // Для Android — добавляет тень с использованием elevation
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.antiFlashWhite,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  orderId: {
    flex: 1,
    fontSize: 16,
    color: Colors.darkCharcoal,
  },
  date: {
    fontSize: 14,
    color: Colors.gray,
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  quantity: {
    fontSize: 16,
    color: Colors.gray,
  },
  details: {
    marginLeft: -20,
    backgroundColor: Colors.darkCharcoal,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  detailsText: {
    fontSize: 16,
    color: Colors.white,
  },
  status: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusText: {
    flex: 1,
    color: Colors.crayola,
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "right",
  },
});

export default OrderItem;
