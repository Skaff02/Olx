import { StyleSheet, Text, TextInput as RNTextInput, View } from 'react-native'
import React from 'react'
import colors from '../../../theme/colors'
import fonts from '../../../theme/fonts'

interface TextInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  keyboardType?: 'default' | 'numeric' | 'decimal-pad'
  required?: boolean
}

const TextInput = ({ label, value, onChangeText, placeholder, keyboardType = 'default', required }: TextInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <RNTextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        keyboardType={keyboardType}
      />
    </View>
  )
}

export default TextInput

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.text_dark,
    marginBottom: 8,
  },
  required: {
    color: colors.secondary,
  },
  input: {
    backgroundColor: colors.background_dark,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text_dark,
  },
})

