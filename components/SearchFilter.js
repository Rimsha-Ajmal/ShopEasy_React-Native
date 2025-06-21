import React, { useState, useEffect, useMemo } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Icon } from 'react-native-elements';
import { useThemeContext } from '../context/ThemeContext';

const SearchFilter = ({ searchText, setSearchText, products, setFilteredProducts }) => {
  const { theme } = useThemeContext();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('none');

  const categories = useMemo(() => {
    const unique = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(unique)];
  }, [products]);

  useEffect(() => {
    applyFilters();
  }, [searchText, selectedCategory, sortOrder, products]);

  const applyFilters = () => {
    let data = [...products];

    if (searchText) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      data = data.filter((item) => item.category === selectedCategory);
    }

    if (sortOrder === 'low') {
      data.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high') {
      data.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(data);
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={[
        styles.searchRow,
        {
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f0f0f0',
          borderColor: theme === 'dark' ? '#444' : '#ccc',
        }
      ]}>
        <Icon name="search" size={20} color={theme === 'dark' ? '#fff' : '#000'} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor={theme === 'dark' ? '#888' : '#666'}
          style={[
            styles.input,
            { color: theme === 'dark' ? '#fff' : '#000' }
          ]}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Category Picker */}
      <View style={[
        styles.pickerWrapper,
        {
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f0f0f0',
          borderColor: theme === 'dark' ? '#444' : '#ccc',
        }
      ]}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={[styles.picker, { color: theme === 'dark' ? '#fff' : '#000' }]}
          dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
        >
          {categories.map((cat) => (
            <Picker.Item label={cat} value={cat} key={cat} />
          ))}
        </Picker>
      </View>

      {/* Sort Picker */}
      <View style={[
        styles.pickerWrapper,
        {
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f0f0f0',
          borderColor: theme === 'dark' ? '#444' : '#ccc',
        }
      ]}>
        <Picker
          selectedValue={sortOrder}
          onValueChange={(itemValue) => setSortOrder(itemValue)}
          style={[styles.picker, { color: theme === 'dark' ? '#fff' : '#000' }]}
          dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
        >
          <Picker.Item label="Sort by Price" value="none" />
          <Picker.Item label="Low to High" value="low" />
          <Picker.Item label="High to Low" value="high" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 50,
    fontSize: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    height: 60,
    justifyContent: 'center',
  },
  picker: {
    height: 60,
    width: '100%',
    fontSize: 16,
  },
});

export default SearchFilter;
