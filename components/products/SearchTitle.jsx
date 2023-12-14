import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./SearchTitle.style";
import { useNavigation } from "@react-navigation/native";

const SearchTitle = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("ProductDetail", { item })}
      >
        <View style={styles.image}>
          <Image
            source={{ uri: item.productImages[0] }}
            style={styles.productImg}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.productName}>{item.productName}</Text>
          <Text style={styles.productCategory}>
            {item.productCategory.categoryName}
          </Text>
          <Text style={styles.productPrice}>
            {item.productPrice.toLocaleString("vi-VN")} đ
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTitle;
