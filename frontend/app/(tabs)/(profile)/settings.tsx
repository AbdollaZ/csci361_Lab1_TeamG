import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Header, { HeaderBack } from "@/components/ui/Header";
import SectionItem from "@/components/ui/SectionItem";
import { NunitoSansText } from "@/components/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Input } from "@/components/ui/Input";
import MaskInput from "react-native-mask-input/src/MaskInput";
import EditableInput from "@/components/ui/EditableInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";

const phoneMask = [
  "+", // Префикс международного номера
  /\d/, // Первая цифра кода страны
  " ", // Разделитель
  "(", // Открывающая скобка для региона
  /\d/, // Первая цифра региона
  /\d?/,
  /\d?/,
  ")", // Закрывающая скобка
  " ", // Разделитель
  /\d/, // Первая цифра основного номера
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

const Settings = () => {
  const router = useRouter();
  const [editUser, setEditUser] = useState(false);

  const refName = useRef<TextInput>(null);
  const refSurname = useRef<TextInput>(null);
  const refPhone = useRef<TextInput>(null);
  const refFarmName = useRef<TextInput>(null);
  const refFarmLocation = useRef<TextInput>(null);

  const isBuyer = true;

  const [switches, setSwitches] = useState({
    notifyDelivery: true,
    notifySales: false,
    notifyNewProducts: false,
  });

  console.log(switches);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    dirty,
  } = useFormik({
    initialValues: {
      name: "Baurzhan",
      surname: "Zhakianov",
      phoneNumber: "",
      farmName: "",
      farmLocation: "",
    },
    validationSchema: object().shape({
      name: string(),
      surname: string(),
      phoneNumber: string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone number can only contain digits")
        .min(11, "Phone number must be at least 11 digits"),
      farmName: string(),
      farmLocation: string(),
    }),
    onSubmit: (values) => {
      console.log(values);
      Keyboard.dismiss();
    },
  });

  const onCloseEdit = () => {
    setEditUser(false);
    resetForm();
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (dirty) {
      setEditUser(true);
    }
  }, [dirty]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header
        title="Settings"
        style={styles.header}
        leftElement={
          editUser ? (
            <TouchableOpacity onPress={onCloseEdit} style={styles.headerIcon}>
              <Ionicons
                size={24}
                color={Colors.fireOpal}
                name={"close-outline"}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={router.back} style={styles.headerIcon}>
              <Ionicons
                name={"chevron-back"}
                color={Colors.darkCharcoal}
                size={24}
              />
            </TouchableOpacity>
          )
        }
        rightElement={
          editUser ? (
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.headerIcon}
            >
              <Ionicons
                size={24}
                color={Colors.crayola}
                name={"save-outline"}
              />
            </TouchableOpacity>
          ) : null
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps={false}
      >
        <View style={styles.userData}>
          <View style={styles.part}>
            <NunitoSansText type={"bold"} style={styles.partTitle}>
              Personal Information
            </NunitoSansText>
          </View>
          <EditableInput
            ref={refName}
            label={"Name"}
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            onSubmitEditing={() => refSurname.current?.focus()}
            error={touched && errors.name ? errors.name : ""}
          />
          <EditableInput
            ref={refSurname}
            label={"Surname"}
            value={values.surname}
            onChangeText={handleChange("surname")}
            onBlur={handleBlur("surname")}
            onSubmitEditing={() => refPhone.current?.focus()}
            error={touched.surname && errors.surname ? errors.surname : ""}
          />
          <EditableInput
            ref={refPhone}
            label={"Phone"}
            value={values.phoneNumber}
            placeholder={"Enter your phone number"}
            onChangeText={(_, unmasked) => {
              setFieldValue("phoneNumber", unmasked); // you can use the unmasked value as well
            }}
            onBlur={handleBlur("phoneNumber")}
            onSubmitEditing={() => refFarmName.current?.focus()}
            error={
              touched.phoneNumber && errors.phoneNumber
                ? errors.phoneNumber
                : ""
            }
            mask={phoneMask}
          />
          {!isBuyer ? (
            <>
              <EditableInput
                ref={refFarmName}
                label={"Farm name"}
                value={values.farmName}
                placeholder={"Enter farm name"}
                onChangeText={handleChange("farmName")}
                onBlur={handleBlur("farmName")}
                onSubmitEditing={() => refFarmLocation.current?.focus()}
                error={
                  touched.farmName && errors.farmName ? errors.farmName : ""
                }
              />
              <EditableInput
                ref={refFarmLocation}
                label={"Farm location"}
                value={values.farmLocation}
                placeholder={"Enter farm location"}
                onChangeText={handleChange("farmLocation")}
                onBlur={handleBlur("farmLocation")}
                error={
                  touched.farmLocation && errors.farmLocation
                    ? errors.farmLocation
                    : ""
                }
              />
            </>
          ) : null}
        </View>

        {isBuyer ? (
          <View style={styles.sections}>
            <View style={styles.part}>
              <NunitoSansText type={"bold"} style={styles.partTitle}>
                Notifications
              </NunitoSansText>
            </View>
            <SectionItem
              disabled
              label={"Delivery status changes"}
              style={styles.section}
              labelStyle={styles.sectionLabel}
              rightElement={
                <Switch
                  value={switches.notifyDelivery}
                  onValueChange={(v) =>
                    setSwitches((prev) => ({ ...prev, notifyDelivery: v }))
                  }
                />
              }
            />
            <SectionItem
              disabled
              label={"Sales"}
              style={styles.section}
              labelStyle={styles.sectionLabel}
              rightElement={
                <Switch
                  value={switches.notifySales}
                  onValueChange={(v) =>
                    setSwitches((prev) => ({ ...prev, notifySales: v }))
                  }
                />
              }
            />
            <SectionItem
              disabled
              label={"New products"}
              style={styles.section}
              labelStyle={styles.sectionLabel}
              rightElement={
                <Switch
                  value={switches.notifyNewProducts}
                  onValueChange={(v) =>
                    setSwitches((prev) => ({ ...prev, notifyNewProducts: v }))
                  }
                />
              }
            />
          </View>
        ) : null}

        <View style={styles.sections}>
          <View style={styles.part}>
            <NunitoSansText type={"bold"} style={styles.partTitle}>
              Actions
            </NunitoSansText>
          </View>
          <SectionItem
            label={"Change password"}
            style={styles.section}
            labelStyle={styles.sectionLabel}
            onPress={() => router.navigate("/change-password")}
          />
        </View>

        {isBuyer ? (
          <View style={styles.sections}>
            <View style={styles.part}>
              <NunitoSansText type={"bold"} style={styles.partTitle}>
                Other
              </NunitoSansText>
            </View>
            <SectionItem
              label={"FAQ"}
              style={styles.section}
              labelStyle={styles.sectionLabel}
            />
          </View>
        ) : null}
      </KeyboardAwareScrollView>
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
    marginBottom: 20,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sections: {
    gap: 15,
    marginBottom: 40,
  },
  section: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: Colors.white,
    shadowColor: "#000", // Цвет тени
    shadowOffset: { width: 0, height: 10 }, // Смещение тени
    shadowOpacity: 0.1, // Прозрачность тени
    shadowRadius: 10, // Радиус размытия тени
    elevation: 5, // Для Android — добавляет тень с использованием elevation
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: "NunitoSans-SemiBold",
  },
  part: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  partTitle: {
    fontSize: 16,
    color: Colors.darkCharcoal,
  },
  headerIcon: {
    padding: 20,
    margin: -20,
  },
  input: {
    borderWidth: 0,
    padding: 20,
  },
  userData: {
    gap: 15,
    marginBottom: 40,
  },
});

export default Settings;
