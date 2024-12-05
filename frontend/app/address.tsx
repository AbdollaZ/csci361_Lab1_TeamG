import React, { useRef } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { NunitoSansText } from "@/components/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useFormik } from "formik";
import { object, string } from "yup";
import EditableInput from "@/components/ui/EditableInput";
import Button from "@/components/ui/Button";
import { HeaderBack } from "@/components/ui/Header";

const Address = () => {
  const refAddress = useRef<TextInput>(null);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      address: "",
    },
    validationSchema: object().shape({
      address: string().required("The field is mandatory to fill in"),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={"Add shipping address"} style={styles.header} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <EditableInput
          ref={refAddress}
          label={"Address"}
          value={values.address}
          placeholder={"Enter your address"}
          onChangeText={handleChange("address")}
          onBlur={handleBlur("address")}
          error={touched && errors.address ? errors.address : ""}
        />
        <Button
          title={"Save"}
          onPress={() => handleSubmit()}
          loading={isSubmitting}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
  },
});

export default Address;
