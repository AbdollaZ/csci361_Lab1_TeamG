import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  TextStyle,
} from "react-native";
import { StyleProps } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { GelasioText } from "@/components/fonts";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: StyleProps; // Для дополнительных кастомных стилей, если нужно
  titleStyle?: StyleProp<TextStyle>;
  type?: "outline";
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { title, onPress, style, loading, titleStyle, type } = props;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        loading ? styles.buttonLoading : null,
        type === "outline" ? styles.outline : null,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <GelasioText
          style={[
            styles.buttonText,
            titleStyle,
            type === "outline" ? styles.outlineText : null,
          ]}
          type="semiBold"
        >
          {title}
        </GelasioText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.raisinBlack,
    paddingVertical: 15,
    paddingHorizontal: 29,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    textAlign: "center",
  },
  buttonLoading: {
    opacity: 0.7, // Добавляем прозрачность при загрузке
  },
  outline: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.darkCharcoal,
  },
  outlineText: {
    color: Colors.darkCharcoal,
  },
});

export default Button;
