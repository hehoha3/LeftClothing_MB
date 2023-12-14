import { Alert, Text, TouchableOpacity, View } from "react-native";
import styles from "../../screens/ProductDetail.style";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";

const ProductDetaiContent = ({ item }) => {
  const [count, setCount] = useState(1);
  const [userCarts, setUserCarts] = useState([]);
  const [sizePick, setSizePick] = useState(0);

  useEffect(() => {
    getUserCarts();
    console.log(item);
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
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const incrementCount = () => {
    if (count < item.productQuantity) setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleSizePick = (index) => {
    setSizePick(index);
  };

  const existsInUserCarts = userCarts.some(
    (cart) =>
      cart.product.id.toString() === item.id.toString() &&
      cart.size === item.productSizes[sizePick]
  );

  const updateCart = {
    productId: item.id,
    size: item.productSizes[sizePick],
  };

  const productIdAddToCart = {
    productId: item.id,
    quantity: count,
    size: item.productSizes[sizePick],
  };

  const handleAddToCart = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      if (existsInUserCarts) {
        await axios
          .put(`http://192.168.1.4:5549/cart/up?token=${token}`, updateCart)
          .catch((err) => console.error("Error put data:", err));
      } else {
        await axios
          .post(
            `http://192.168.1.4:5549/cart?token=${token}`,
            productIdAddToCart
          )
          .catch((error) => console.error("Error post data:", error));
      }
      Alert.alert("Thêm Thành công", "Thêm Thành Công Vào Giỏ Hàng", [
        {
          text: "OK",
          onPress: () => console.log("OK"),
        },
      ]);
    } else {
      Alert.alert(
        "Thông Báo",
        "Bạn cần đăng nhập trước khi sử dụng chức năng này",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel pressed"),
          },

          {
            text: "Continue",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
    }
  };

  return (
    <>
      <Text style={styles.title}>{item.productName}</Text>
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.productCategory}>
            {item.productCategory.categoryName}
          </Text>

          <Text style={styles.productType}>{item.productType.name}</Text>
        </View>
        <View style={styles.priceWapper}>
          <Text style={styles.price}>
            {item.productPrice.toLocaleString("vi-VN")} đ
          </Text>
        </View>
      </View>

      <View style={styles.ratingRow}>
        <View style={styles.choiceWapper}>
          <Text style={{ marginRight: 10, fontFamily: "semibold" }}>Size:</Text>
          {item.productSizes.map((i, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.sizeChoice,
                sizePick === index && styles.sizePickChoice,
              ]}
              onPress={() => handleSizePick(index)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: sizePick === index ? "#fff" : "#000",
                }}
              >
                {i}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View>
          <Text style={{ textAlign: "center", fontFamily: "semibold" }}>
            Quantity
          </Text>
          <View style={styles.choiceWapper}>
            <TouchableOpacity onPress={() => decrementCount()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>

            <Text style={styles.quantityChoice}>{count}</Text>

            <TouchableOpacity onPress={() => incrementCount()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.descriptionWrapper}>
        <Text style={styles.description}>Giới Thiệu</Text>
        <Text style={styles.descText}>{item.productDescription}</Text>
      </View>

      <View style={{ marginBottom: SIZES.small - 5 }}>
        <View style={styles.location}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="location-outline" size={20} />
            <Text style={{ marginHorizontal: 5 }}>Da Nang</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
            <Text style={{ marginHorizontal: 5 }}>50.000 đ</Text>
          </View>
        </View>
      </View>

      <View style={styles.cartRow}>
        <TouchableOpacity
          onPress={() => handleAddToCart()}
          style={styles.cartBtn}
        >
          <Text style={styles.cartTitle}>BUY NOW</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.addToCart}>
          <Fontisto name="shopping-bag" size={20} color={COLORS.lightWhite} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProductDetaiContent;
