import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Alert } from "react-native";
import { Button, Rating } from "react-native-elements";
import axios from "axios";
import { API_BASE, postReview } from "../data/api";
import { useThemeContext } from '../context/ThemeContext';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const { theme } = useThemeContext();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment || rating === 0) {
      Alert.alert("Validation Error", "Please provide a rating and comment.");
      return;
    }

    setLoading(true);

    try {
      await postReview({
        productId,
        comment,
        rating,
      });

      setComment("");
      setRating(0);
      Alert.alert("Review Submitted", "Thank you for your feedback!");

      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (error) {
      console.error("Failed to submit review:", error.message);
      Alert.alert("Error", "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#121212' : '#fff' },
      ]}
    >
      <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>
        Leave a Review
      </Text>

      <TextInput
        placeholder="Write your thoughts..."
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
        placeholderTextColor={theme === 'dark' ? '#999' : '#666'}
        style={[
          styles.input,
          {
            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f2f2f2',
            color: theme === 'dark' ? '#fff' : '#000',
            borderColor: theme === 'dark' ? '#444' : '#ccc',
          },
        ]}
      />

      <Text style={[styles.label, { color: theme === 'dark' ? '#ddd' : '#333' }]}>
        Rate this product
      </Text>

      <Rating
        type="custom"
        imageSize={30}
        ratingCount={5}
        startingValue={rating}
        onFinishRating={(val) => setRating(val)}
        tintColor={theme === 'dark' ? '#121212' : '#fff'}
        ratingColor="#FFD700" // filled stars (gold)
        ratingBackgroundColor={theme === 'dark' ? '#333' : '#ccc'} // unfilled stars
        style={styles.rating}
      />
      <Button
        title={loading ? "Submitting..." : "Submit Review"}
        onPress={handleSubmit}
        disabled={loading}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  rating: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    minHeight: 60,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2196f3",
  },
});

export default ReviewForm;
