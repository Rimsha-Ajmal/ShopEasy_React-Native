import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useThemeContext();

  const colors = {
    background: theme === 'dark' ? '#1a1a1a' : '#f2f2f2',
    text: theme === 'dark' ? '#ffffff' : '#222222',
    secondary: theme === 'dark' ? '#bbbbbb' : '#555555',
    card: theme === 'dark' ? '#2a2a2a' : '#ffffff',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.settingBox, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text }]}>Enable Dark Mode</Text>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>
      <Text style={[styles.note, { color: colors.secondary }]}>
        Toggle to switch between Light and Dark themes.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  settingBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
  note: {
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
});

export default SettingsScreen;
