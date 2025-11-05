import { StyleSheet, Text, TextInput as RNTextInput, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
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
  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <RNTextInput
        style={[styles.input, { textAlign: isArabic ? 'right' : 'left' }]}
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
    textAlign: 'left',
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
    width: '100%',
  },
})

