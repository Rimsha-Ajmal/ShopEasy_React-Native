import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { getWishlist } from '../utils/storage';
import ProductCard from '../components/ProductCard';
import { useThemeContext } from '../context/ThemeContext';

const WishlistScreen = ({ navigation }) => {
  const { theme } = useThemeContext();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadWishlist();
    });
    return unsubscribe;
  }, [navigation]);

  const loadWishlist = async () => {
    const list = await getWishlist();
    setWishlist(list);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f9f9f9' },
      ]}
    >
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text
            style={[
              styles.emptyText,
              { color: theme === 'dark' ? '#ffffff' : '#333333' },
            ]}
          >
            Your wishlist is empty
          </Text>
          <Text
            style={[
              styles.subText,
              { color: theme === 'dark' ? '#aaaaaa' : '#666666' },
            ]}
          >
            Save your favorite items to view them here later.
          </Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetail', { product: item })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default WishlistScreen;
