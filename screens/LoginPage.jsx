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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { Formik } from "formik";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, "Username Không được bỏ trống")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password phải có ít nhất 8 ký tự")
    .required("Required"),
});

const LoginPage = ({ navigation }) => {
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

  const login = async (values) => {
    setLoader(true);
    await axios
      .post("http://192.168.1.4:5549/user/signIn", values)
      .then((response) => {
        AsyncStorage.setItem("token", response.data.jwtToken);
        navigation.replace("Bottom Navigation");
      })
      .catch((error) => {
        Alert.alert("ERROR", "Username hoặc password sai !!", [
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
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
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
                    <MaterialCommunityIcons
                      name="email-outline"
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
                  loader={loader}
                  title={"L O G I N"}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                />

                <Text
                  style={styles.registration}
                  onPress={() => navigation.navigate("Signup")}
                >
                  Register
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
