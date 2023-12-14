import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./ProductCardView.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const ProductCardView = ({ item }) => {
  const navigation = useNavigation();
  const image = item.productImages[0];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { item })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.productName}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.productCategory.categoryName}
          </Text>
          <Text style={styles.price}>
            {item.productPrice.toLocaleString("vi-VN")} đ
          </Text>
        </View>

        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
