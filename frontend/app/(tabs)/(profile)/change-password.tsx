import React, { useRef } from "react";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { HeaderBack } from "@/components/ui/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ChangePassword = () => {
  const refPassword = useRef<TextInput>(null);
  const refNewPassword = useRef<TextInput>(null);
  const refConfirmPassword = useRef<TextInput>(null);
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: object().shape({
      password: string(),
      newPassword: string()
        .required("The field is mandatory to fill in")
        .min(6, "The password must consist of at least 8 characters")
        .matches(
          /^[^\s](?=.*[0-9])(?=.*[a-zA-Z]).+[^\s]$/,
          "The password must contain Latin letters and numbers, without spaces",
        ),
      confirmPassword: string()
        .required("The field is mandatory to fill in")
        //   @ts-ignore
        .oneOf([ref("newPassword"), null], "Passwords don't match"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <HeaderBack title={"Change password"} />
        <Input
          ref={refPassword}
          value={values.password}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          error={touched.password && errors.password ? errors.password : ""}
          style={styles.inputContainer}
          inputStyle={styles.input}
          label="Password"
          onSubmitEditing={() => refNewPassword.current?.focus()}
        />
        <Input
          ref={refNewPassword}
          value={values.newPassword}
          onChangeText={handleChange("newPassword")}
          onBlur={handleBlur("newPassword")}
          error={
            touched.newPassword && errors.newPassword ? errors.newPassword : ""
          }
          style={styles.inputContainer}
          inputStyle={styles.input}
          label="Password"
          secureTextEntry
          onSubmitEditing={() => refConfirmPassword.current?.focus()}
        />
        <Input
          ref={refConfirmPassword}
          value={values.confirmPassword}
          onChangeText={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
          error={
            touched.confirmPassword && errors.confirmPassword
              ? errors.confirmPassword
              : ""
          }
          style={styles.inputContainer}
          inputStyle={styles.input}
          label="Confirm password"
          secureTextEntry
          onSubmitEditing={Keyboard.dismiss}
        />
        <Button
          title={"Save"}
          onPress={() => handleSubmit()}
          loading={isSubmitting}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    shadowColor: "#000", // Цвет тени
    shadowOffset: { width: 0, height: 10 }, // Смещение тени
    shadowOpacity: 0.1, // Прозрачность тени
    shadowRadius: 10, // Радиус размытия тени
    elevation: 5, // Для Android — добавляет тень с использованием elevation
    padding: 20,
  },
  input: {
    borderWidth: 0,
  },
});

export default ChangePassword;
