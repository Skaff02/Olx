import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../../theme/colors'
import fonts from '../../../theme/fonts'
import { useNavigation } from '@react-navigation/native'
import { SvgXml } from 'react-native-svg'

interface Choice {
  id: string | number
  label: string
  value: string
}

interface SelectInputProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  choices: Choice[]
  placeholder?: string
  required?: boolean
}

const SelectInput = ({ label, value, onValueChange, choices, placeholder = 'Select...', required }: SelectInputProps) => {
  const navigation = useNavigation<any>()
  
  const selectedChoice = choices.find(c => c.value === value)
  
  const handlePress = () => {
    navigation.navigate('ChoiceSelection', {
      choices,
      fieldName: label,
      selectedValue: value,
      onSelect: onValueChange
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      
      <TouchableOpacity
        style={styles.selector}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={[styles.selectorText, !selectedChoice && styles.placeholder]}>
          {selectedChoice ? selectedChoice.label : placeholder}
        </Text>
        <SvgXml xml={ArrowRightIcon} height={14} />
      </TouchableOpacity>
    </View>
  )
}

export default SelectInput

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.text_dark,
    marginBottom: 8,
    textAlign: 'left',
    backgroundColor: 'red',
  },
  required: {
    color: colors.secondary,
  },
  selector: {
    backgroundColor: colors.background_dark,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left',
    width: '100%',
  },
  selectorText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text_dark,
    flex: 1,
    textAlign: 'left',
  },
  placeholder: {
    color: '#fff',
  },
})

const ArrowRightIcon = `<svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 0.75L8.25 8.25L0.75 15.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
