import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-elements";
import { useThemeContext } from "../context/ThemeContext";

const ProductCard = ({ product, onPress }) => {
  const { theme } = useThemeContext();

  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        containerStyle={[
          styles.card,
          theme === "dark" && { backgroundColor: "#1e1e1e" },
        ]}
      >
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={[styles.name, theme === "dark" && { color: "#fff" }]}>
            {product.name}
          </Text>
          <Text style={[styles.price, theme === "dark" && { color: "#aaa" }]}>
            ${product.price}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "contain",
  },
  info: {
    marginTop: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    color: "#333",
    marginTop: 4,
  },
});

export default ProductCard;
