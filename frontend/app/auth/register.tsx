import React, { useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  LayoutChangeEvent,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { MerriWeatherText, NunitoSansText } from "@/components/fonts";
import Button from "@/components/ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input } from "@/components/ui/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Carousel from "react-native-reanimated-carousel";
import { ICarouselInstance } from "react-native-reanimated-carousel/src/types";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Select from "@/components/ui/Select";
import { useRegisterMutation } from "@/api/authApi";
import { useAppDispatch } from "@/store";
import { setUserAction } from "@/store/slices/auth";
const { width, height } = Dimensions.get("window");

const items = [1, 2];

export default function RegisterScreen() {
  const router = useRouter();
  const refCarousel = useRef<ICarouselInstance>(null);
  const refEmail = useRef<TextInput>(null);
  const refName = useRef<TextInput>(null);
  const refSurname = useRef<TextInput>(null);
  const refPassword = useRef<TextInput>(null);
  const refConfirmPassword = useRef<TextInput>(null);
  const refGovId = useRef<TextInput>(null);
  const progress = useSharedValue<number>(0);
  const dispatch = useAppDispatch();
  const [register] = useRegisterMutation();

  const {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "",
      govId: "",
    },
    validationSchema: object().shape({
      name: string().required("The field is mandatory to fill in"),
      surname: string().required("The field is mandatory to fill in"),
      govId: string(),
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
      confirmPassword: string()
        .required("The field is mandatory to fill in")
        //   @ts-ignore
        .oneOf([ref("password"), null], "Passwords don't match"),
      userType: string()
        .required("The field is mandatory to fill in")
        .oneOf(
          ["farmer", "buyer"],
          'The user type must be either "farmer" or "buyer".',
        ),
    }),
    onSubmit: async (formData, { setSubmitting }) => {
      setSubmitting(true);

      const req =
        formData.userType === "farmer"
          ? {
              farmer_name: formData.name,
              farmer_surname: formData.surname,
              farmer_email: formData.email,
              phone_number: "",
              farm_location: "",
              farm_name: "",
              password: formData.password,
              gov_id: formData.govId,
              userType: formData.userType,
            }
          : {
              buyer_name: formData.name,
              buyer_surname: formData.surname,
              email: formData.email,
              phone_number: "",
              address: "",
              password: formData.password,
              userType: formData.userType,
            };
      register(req)
        .then((res) => {
          if (res.data) {
            dispatch(setUserAction(res.data));
            router.replace("/(tabs)/home");
          }
          setSubmitting(false);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => setSubmitting(false));
      //     TODO send request to backend with ReactQuery
      //     TODO reset router history
    },
  });

  const onSelectType = (value?: string) => {
    if (value) {
      setFieldValue("userType", value);
    }
  };
  const onLogin = () => {
    router.back();
  };

  const continueForm = () => {
    const form1 = ["email", "password", "confirmPassword"];
    // @ts-ignore
    if (form1.some((i) => errors[i])) {
      refCarousel.current?.scrollTo({
        index: 0,
        animated: true,
      });
    } else {
      refCarousel.current?.scrollTo({
        index: 1,
        animated: true,
      });
    }
  };

  const onPressPagination = (index: number) => {
    refCarousel.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.aware}
      extraScrollHeight={50}
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
          <MerriWeatherText style={styles.title} type={"bold"}>
            WELCOME
          </MerriWeatherText>
        </View>
        <Carousel
          ref={refCarousel}
          scrollAnimationDuration={1300}
          loop={false}
          width={width}
          height={height * 0.45}
          data={items}
          onProgressChange={(_, value) => {
            progress.value = value;
          }}
          renderItem={({ index }) => (
            <View style={styles.form}>
              {index === 0 ? (
                <>
                  <Input
                    ref={refEmail}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={touched.email && errors.email ? errors.email : ""}
                    inputStyle={styles.input}
                    label="Email"
                    keyboardType="email-address"
                    onSubmitEditing={() => refPassword.current?.focus()}
                    autoCapitalize={"none"}
                  />
                  <View>
                    <Input
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      error={
                        touched.password && errors.password
                          ? errors.password
                          : ""
                      }
                      ref={refPassword}
                      inputStyle={styles.input}
                      label="Password"
                      secureTextEntry
                      onSubmitEditing={() =>
                        refConfirmPassword.current?.focus()
                      }
                    />
                    <Input
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      error={
                        touched.confirmPassword && errors.confirmPassword
                          ? errors.confirmPassword
                          : ""
                      }
                      ref={refConfirmPassword}
                      inputStyle={styles.input}
                      label="Confirm password"
                      secureTextEntry
                      onEndEditing={Keyboard.dismiss}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <Input
                      style={{ flex: 0.8 }}
                      ref={refName}
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      error={touched.name && errors.name ? errors.name : ""}
                      inputStyle={[styles.input, { paddingVertical: 10 }]}
                      label="Name"
                      onSubmitEditing={() => refSurname.current?.focus()}
                    />
                    <Input
                      style={{ flex: 0.8 }}
                      value={values.surname}
                      onChangeText={handleChange("surname")}
                      onBlur={handleBlur("surname")}
                      error={
                        touched.surname && errors.surname ? errors.surname : ""
                      }
                      ref={refSurname}
                      inputStyle={[styles.input, { paddingVertical: 10 }]}
                      label="Surname"
                      onSubmitEditing={() => refGovId.current?.focus()}
                    />
                  </View>
                  {values.userType === "farmer" ? (
                    <Input
                      ref={refGovId}
                      value={values.govId}
                      onChangeText={handleChange("govId")}
                      onBlur={handleBlur("govId")}
                      error={touched.govId && errors.govId ? errors.govId : ""}
                      inputStyle={[styles.input, { paddingVertical: 10 }]}
                      label="Gov ID"
                      onSubmitEditing={Keyboard.dismiss}
                      autoCapitalize={"none"}
                    />
                  ) : null}
                  <Select
                    style={styles.select}
                    value={values.userType}
                    label={"User"}
                    placeholder={"Choose your user-type"}
                    data={[
                      ["Farmer", "farmer"],
                      ["Buyer", "buyer"],
                    ]}
                    onPress={() => setFieldValue("userType", "buyer")}
                    onLongPress={() => setFieldValue("userType", "farmer")}
                    onChangeValue={onSelectType}
                    error={
                      touched.userType && errors.userType ? errors.userType : ""
                    }
                    onPressOut={() => {
                      setFieldTouched("userType", true);
                    }}
                  />
                </>
              )}
            </View>
          )}
        />
        <View style={styles.paginationContainer}>
          {items.map((_, index) => (
            <PaginationDot
              key={index}
              index={index}
              currentIndex={progress}
              onPress={() => onPressPagination(index)}
            />
          ))}
        </View>

        <View style={styles.controls}>
          <Button
            title={isValid ? "Sign up" : "Continue"}
            onPress={isValid ? handleSubmit : continueForm}
            loading={isSubmitting}
          />
          <TouchableOpacity onPress={onLogin}>
            <NunitoSansText type={"semiBold"} style={styles.link}>
              Already have account?&nbsp;
              <NunitoSansText type={"bold"} style={styles.link2}>
                SIGN IN
              </NunitoSansText>
            </NunitoSansText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const PaginationDot = ({
  index,
  currentIndex,
  onPress,
}: {
  index: number;
  currentIndex: SharedValue<number>;
  onPress: () => void;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [0.8, 1.2, 0.8],
    );
    const opacity = interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [0.5, 1, 0.5],
    );
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[styles.paginationDot, animatedStyle]} />
    </TouchableOpacity>
  );
};

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
  input2: {},
  title: {
    color: Colors.darkCharcoal,
    fontSize: 24,
    lineHeight: 45,
  },
  link: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
  },
  link2: {
    fontSize: 14,
    color: Colors.darkCharcoal,
  },
  controls: {
    gap: 30,
    alignItems: "center",
    paddingLeft: 15,
    marginTop: 35,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
    marginHorizontal: 5,
    padding: 10,
  },
  select: {
    borderWidth: 2,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderRightWidth: 0,
  },
});
