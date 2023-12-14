import { Image, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "./profile.style";
import { COLORS } from "../constants";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token !== null) {
        await axios
          .get(`http://192.168.1.4:5549/user/who?token=${token}`)
          .then((response) => {
            setUserData(response.data);
            setUserLogin(true);
          });
      } else {
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const userLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.replace("Bottom Navigation");
    } catch (e) {
      console.log("Error logout: ", e);
    }
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to log out", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel pressed"),
      },

      {
        text: "Continue",
        onPress: () => userLogout(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/space.jpg")}
            style={styles.cover}
          />
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/profile.jpeg")}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin
              ? userData.firstName + " " + userData.lastName
              : "Bạn chưa đăng nhập"}
          </Text>

          {!userLogin ? (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData.email}</Text>
            </View>
          )}

          {!userLogin ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate("Order")}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons
                    name="bag"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign name="logout" size={24} color={COLORS.primary} />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
