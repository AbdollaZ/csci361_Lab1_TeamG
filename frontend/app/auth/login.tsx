import React, { useRef } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { MerriWeatherText, NunitoSansText } from "@/components/fonts";
import Button from "@/components/ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input } from "@/components/ui/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useLoginMutation } from "@/api/authApi";
import { setUserAction } from "@/store/slices/auth";
import { useAppDispatch } from "@/store";

export default function LoginScreen() {
  const router = useRouter();
  const refEmail = useRef<TextInput>(null);
  const refPassword = useRef<TextInput>(null);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      userType: "",
    },
    validationSchema: object().shape({
      email: string()
        .email("Invalid email address")
        .required("The field is mandatory to fill in"),
      password: string()
        .required("The field is mandatory to fill in")
        .min(6, "The password must consist of at least 8 characters")
        .matches(
          /^[^\s](?=.*[0-9])(?=.*[a-zA-Z]).+[^\s]$/,
          "The password must contain Latin letters and numbers, without spaces",
        ),
    }),
    onSubmit: async (formData, { setSubmitting }) => {
      setSubmitting(true);

      const req =
        formData.userType === "farmer"
          ? {
              farmer_email: formData.email,
              password: formData.password,
              userType: "farmer",
            }
          : {
              email: formData.email,
              password: formData.password,
              userType: "buyer",
            };

      login(req)
        .then((res) => {
          if (res.data) {
            dispatch(setUserAction(res.data));
            router.replace("/(tabs)/home");
          }
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <KeyboardAwareScrollView
      style={styles.aware}
      scrollEnabled={false}
      keyboardShouldPersistTaps={"handled"}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.line} />
          <View style={styles.logoWrap}>
            <View style={styles.logo}>
              <Ionicons name={"book"} size={30} color={Colors.darkCharcoal} />
            </View>
          </View>
        </View>
        <View style={styles.titles}>
          <MerriWeatherText style={styles.title}>Hello !</MerriWeatherText>
          <MerriWeatherText style={styles.title2} type={"bold"}>
            WELCOME BACK
          </MerriWeatherText>
        </View>

        <View style={styles.form}>
          <Input
            ref={refEmail}
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={touched.email && errors.email ? errors.email : ""}
            inputStyle={styles.input}
            label="Email"
            keyboardType="email-address"
            onEndEditing={() => refPassword.current?.focus()}
            autoCapitalize={"none"}
          />
          <View>
            <Input
              ref={refPassword}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={touched.password && errors.password ? errors.password : ""}
              inputStyle={styles.input}
              label="Password"
              secureTextEntry
              onEndEditing={Keyboard.dismiss}
            />
          </View>

          <View style={styles.controls}>
            <NunitoSansText
              type={"semiBold"}
              style={styles.link2}
              onPress={() => router.navigate("/auth/forgot-password")}
            >
              Forgot Password
            </NunitoSansText>
            <Button
              title={"Log in"}
              onPress={() => handleSubmit()}
              loading={isSubmitting}
            />
            <NunitoSansText
              type={"semiBold"}
              style={styles.link}
              onPress={() => router.navigate("/auth/register")}
            >
              Sign up
            </NunitoSansText>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  aware: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: "center",
  },
  line: {
    position: "absolute",
    bottom: "50%",
    left: 0,
    right: 0,
    width: "100%",
    height: 1,
    backgroundColor: Colors.grayX11,
  },
  logoWrap: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  logo: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.darkCharcoal,
    borderWidth: 1,
    borderCurve: "circular",
  },
  titles: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  form: {
    flex: 1,
    marginLeft: -20,
    marginRight: 30,
    marginVertical: 25,
    paddingVertical: 30,
    paddingLeft: 40,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 15, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: Colors.chineseWhite,
    paddingVertical: 20,
    paddingRight: 20,
  },
  title: {
    color: Colors.philippineGray,
    fontSize: 30,
    lineHeight: 45,
  },
  title2: {
    color: Colors.darkCharcoal,
    fontSize: 24,
    lineHeight: 45,
  },
  link: {
    fontSize: 18,
    color: Colors.darkCharcoal,
    textTransform: "uppercase",
  },
  link2: {
    fontSize: 18,
    color: Colors.darkCharcoal,
    textAlign: "center",
  },
  controls: {
    gap: 30,
    alignItems: "center",
    paddingLeft: 15,
    marginTop: 35,
  },
});
