import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBtn, Button } from "../components";
import { Image } from "react-native";
import styles from "./loginPage.style";
import * as Yup from "yup";
import {
  MaterialCommunityIcons,
  AntDesign,
  EvilIcons,
} from "@expo/vector-icons";
import { COLORS } from "../constants";
import { Formik } from "formik";
import axios from "axios";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, "Username Không được bỏ trống")
    .required("Required"),
  email: Yup.string().email("Email Không được bỏ trống").required("Required"),
  phoneNumber: Yup.string()
    .min(10, "Số điện thoại Không được bỏ trống")
    .required("Required"),
  firstName: Yup.string()
    .min(1, "FirstName Không được bỏ trống")
    .required("Required"),
  lastName: Yup.string()
    .min(1, "LastName Không được bỏ trống")
    .required("Required"),
  address: Yup.string()
    .min(1, "Địa chỉ Không được bỏ trống")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password phải có ít nhất 8 ký tự")
    .required("Required"),
});

const Signup = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);

  const inValidForm = () => {
    Alert.alert("Invalid Form", "Please provide all require fields", [
      {
        text: "Continue",
        onPress: () => {},
      },
    ]);
  };

  const registerUser = async (values) => {
    setLoader(true);
    await axios
      .post("http://192.168.1.4:5549/user/signup", values)
      .then((response) => {
        AsyncStorage.setItem("token", response.data.jwtToken);
        navigation.replace("Bottom Navigation");
      })
      .catch((error) => {
        Alert.alert("Đăng Ký thành công", "quay lại Trang đăng nhập !!", [
          {
            text: "Continue",
            onPress: () => {},
          },
        ]);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/bk.png")}
            style={styles.cover}
          />

          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>

          <Formik
            initialValues={{
              username: "",
              email: "",
              phoneNumber: "",
              firstName: "",
              lastName: "",
              address: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => registerUser(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
              setFieldTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Username</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.username ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <AntDesign
                      name="user"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder="Enter Username"
                      onFocus={() => {
                        setFieldTouched("username");
                      }}
                      onBlur={() => setFieldTouched("username", "")}
                      value={values.username}
                      onChangeText={handleChange("username")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorMessage}>{errors.username}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder="Enter Email"
                      onFocus={() => {
                        setFieldTouched("email");
                      }}
                      onBlur={() => setFieldTouched("email", "")}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Phone Number</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.phoneNumber ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <AntDesign
                      name="phone"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder="Enter Phone Number"
                      keyboardType="number-pad"
                      onFocus={() => {
                        setFieldTouched("phoneNumber");
                      }}
                      onBlur={() => setFieldTouched("phoneNumber", "")}
                      value={values.phoneNumber}
                      onChangeText={handleChange("phoneNumber")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text style={styles.errorMessage}>
                      {errors.phoneNumber}
                    </Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>FirstName</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.firstName ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <AntDesign
                      name="user"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder="Enter First Name"
                      onFocus={() => {
                        setFieldTouched("firstName");
                      }}
                      onBlur={() => setFieldTouched("firstName", "")}
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.firstName && errors.firstName && (
                    <Text style={styles.errorMessage}>{errors.firstName}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>LastName</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.lastName ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <AntDesign
                      name="user"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder="Enter Last Name"
                      onFocus={() => {
                        setFieldTouched("lastName");
                      }}
                      onBlur={() => setFieldTouched("lastName", "")}
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.lastName && errors.lastName && (
                    <Text style={styles.errorMessage}>{errors.lastName}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Address</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.address ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <EvilIcons
                      name="location"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder="Enter Address"
                      onFocus={() => {
                        setFieldTouched("address");
                      }}
                      onBlur={() => setFieldTouched("address", "")}
                      value={values.address}
                      onChangeText={handleChange("address")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.address && errors.address && (
                    <Text style={styles.errorMessage}>{errors.address}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      secureTextEntry={!obsecureText}
                      placeholder="Enter Password"
                      onFocus={() => {
                        setFieldTouched("password");
                      }}
                      onBlur={() => setFieldTouched("password", "")}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />

                    <TouchableOpacity
                      onPress={() => {
                        setObsecureText(!obsecureText);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={!obsecureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>

                <Button
                  title={"S I G N U P"}
                  onPress={isValid ? handleSubmit : inValidForm}
                  loader={loader}
                  isValid={isValid}
                />

                <Text
                  style={styles.loginNavigate}
                  onPress={() => navigation.navigate("Login")}
                >
                  Login
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Signup;
