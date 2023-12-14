import { Alert, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./cart.style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const Cart = ({ navigation }) => {
  const [userCarts, setUserCarts] = useState([]);

  useEffect(() => {
    getUserCarts();
  }, []);

  const getUserCarts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token !== null) {
        await axios
          .get(`http://192.168.1.4:5549/cart?token=${token}`)
          .then((response) => {
            setUserCarts(response.data);
          });
      } else {
        Alert.alert("Error", "Cần phải đăng nhập trước", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel pressed"),
          },

          {
            text: "Continue",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleDeleteCart = async (cart) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token !== null) {
        await axios
          .delete(`http://192.168.1.4:5549/cart?token=${token}`, {
            data: cart,
          })
          .then((response) => {
            console.log(response.data);
            const updatedUserCarts = userCarts.filter(
              (item) =>
                item.product.id !== cart.productId || item.size !== cart.size
            );
            setUserCarts(updatedUserCarts);
          });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const checkOut = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token !== null) {
        if (userCarts.length > 0) {
          await axios
            .delete(`http://192.168.1.4:5549/cart/checkout?token=${token}`)
            .then(() => {
              Alert.alert("Thông Báo !", "Thanh Toán Thành Công", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel pressed"),
                },
              ]);
              setUserCarts([]);
            });
        } else {
          Alert.alert("Thông Báo !", "Giỏ Hàng trống", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel pressed"),
            },
          ]);
        }
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={30} />
          </TouchableOpacity>

          <Text style={styles.title}>Giỏ Hàng</Text>
        </View>
      </View>

      <ScrollView>
        {userCarts.length == 0 && (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ fontFamily: "light", fontSize: 20 }}>
              Giỏ Hàng Trống !!
            </Text>
          </View>
        )}
        {userCarts.map((cart, index) => {
          const cartDelete = {
            productId: cart.product.id,
            size: cart.size,
          };
          return (
            <View key={index} style={styles.cart}>
              <View style={styles.image}>
                <Image
                  source={{ uri: cart.product.productImages[0] }}
                  style={styles.productImg}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "bold" }}>
                  {cart.product.productName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text>Price: {cart.product.productPrice}</Text>
                  <Text style={{ marginLeft: 50 }}>Size: {cart.size}</Text>
                </View>
                <Text>Quantity: {cart.quantity}</Text>
                <Text>
                  Total Price: {cart.quantity * cart.product.productPrice}
                </Text>
              </View>

              <Button title="X" onPress={() => handleDeleteCart(cartDelete)} />
            </View>
          );
        })}
      </ScrollView>
      <Button title="Thanh Toán" onPress={() => checkOut()} />
    </>
  );
};

export default Cart;
