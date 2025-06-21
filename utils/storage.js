// storage.js

import AsyncStorage from "@react-native-async-storage/async-storage";

const WISHLIST_KEY = "wishlist";

export const getWishlist = async () => {
  const data = await AsyncStorage.getItem(WISHLIST_KEY);
  return data ? JSON.parse(data) : [];
};

export const toggleWishlistItem = async (product) => {
  const wishlist = await getWishlist();
  const exists = wishlist.find((item) => item.id === product.id);

  let updated;
  if (exists) {
    updated = wishlist.filter((item) => item.id !== product.id);
  } else {
    updated = [...wishlist, product];
  }

  await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
};
