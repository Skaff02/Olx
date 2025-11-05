import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../../theme/colors'
import fonts from '../../../theme/fonts'

interface Choice {
  value: string
  label: string
  id: number
}

interface HorizontalChoiceProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  choices: Choice[]
  required?: boolean
}

const HorizontalChoice = ({ label, value, onValueChange, choices, required }: HorizontalChoiceProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      
      <View style={styles.choicesContainer}>
        {choices.map((choice) => (
          <TouchableOpacity
            key={choice.id}
            style={[
              styles.choiceButton,
              value === choice.value && styles.choiceButtonSelected
            ]}
            onPress={() => onValueChange(choice.value)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.choiceText,
              value === choice.value && styles.choiceTextSelected
            ]}>
              {choice.label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default HorizontalChoice

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
  choicesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  choiceButton: {
    backgroundColor: colors.background_dark,
    borderWidth: 1,
    borderColor: colors.border_dark,
    borderRadius: 200,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceButtonSelected: {
    borderWidth: 1,
    borderColor: '#2596be',
    backgroundColor: '#182750',
  },
  choiceText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.text_dark,
  },
  choiceTextSelected: {
    fontFamily: fonts.regular,
  },
})

