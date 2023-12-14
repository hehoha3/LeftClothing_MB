import { Text, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import styles from "./ProductDetail.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useRoute } from "@react-navigation/native";
import { SliderBox } from "react-native-image-slider-box";
import { ProductRow } from "../components";
import ProductDetaiContent from "../components/products/ProductDetaiContent";

const ProductDetail = ({ navigation }) => {
  const router = useRoute();
  const { item } = router.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={{ height: 412 }}>
        <SliderBox
          images={item.productImages}
          dotColor={COLORS.primary}
          inactiveDotColor={COLORS.secondary}
          ImageComponentStyle={styles.image}
        />
      </View>

      <View style={styles.detail}>
        <ProductDetaiContent item={item} />
      </View>

      <Text style={{ fontFamily: "semibold", fontSize: 20, marginLeft: 10 }}>
        Các Sản Phẩm Khác
      </Text>

      <ProductRow />
    </ScrollView>
  );
};

export default ProductDetail;
