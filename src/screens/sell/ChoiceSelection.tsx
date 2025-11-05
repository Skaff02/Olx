import { StyleSheet, View, FlatList, TouchableOpacity, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../../components/shared/Header'
import { SvgXml } from 'react-native-svg'
import { useTranslation } from 'react-i18next'

interface Choice {
  value: string
  label: string
  id: number
}

const ChoiceSelection = ({ navigation, route }: { navigation: any, route: any }) => {
  const { choices, fieldName, onSelect, selectedValue, selectedValues, multiSelect = false } = route.params
  const insets = useSafeAreaInsets()
  const [searchQuery, setSearchQuery] = useState('')
  const [tempSelectedValues, setTempSelectedValues] = useState<string[]>(selectedValues || [])

  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  console.log('ChoiceSelection - choices:', choices)
  console.log('ChoiceSelection - fieldName:', fieldName)
  console.log('ChoiceSelection - multiSelect:', multiSelect)

  const handleSelect = (choice: Choice) => {
    if (multiSelect) {
      // Toggle selection for multi-select
      const isSelected = tempSelectedValues.includes(choice.value)
      if (isSelected) {
        setTempSelectedValues(tempSelectedValues.filter(v => v !== choice.value))
      } else {
        setTempSelectedValues([...tempSelectedValues, choice.value])
      }
    } else {
      // Single select - close immediately
      console.log('Selected choice:', choice)
      onSelect(choice.value)
      navigation.goBack()
    }
  }

  const handleDone = () => {
    onSelect(tempSelectedValues)
    navigation.goBack()
  }

  const isSelected = (value: string) => {
    if (multiSelect) {
      return tempSelectedValues.includes(value)
    }
    return selectedValue === value
  }

  const filteredChoices = choices.filter((choice: Choice) =>
    choice.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderChoice = ({ item }: { item: Choice }) => (
    <TouchableOpacity
      style={styles.choiceItem}
      activeOpacity={0.8}
      onPress={() => handleSelect(item)}
    >
      <Text style={[styles.choiceText]}>
        {item.label}
      </Text>
      {isSelected(item.value) && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={fieldName} />

      <View style={styles.searchContainer}>
        <SvgXml xml={SearchIcon} height={20} />
        <TextInput
          style={[styles.searchInput, { textAlign: isArabic ? 'right' : 'left' }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={isArabic ? 'ابحث...' : 'Search...'}
          placeholderTextColor={colors.text_gray}
        />
      </View>

      <FlatList
        data={filteredChoices}
        renderItem={renderChoice}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      
      {multiSelect && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
            activeOpacity={0.8}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default ChoiceSelection

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_dark,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background_dark,
    borderWidth: 1,
    borderColor: colors.border_dark,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text_dark,
    padding: 0,
  },
  listContainer: {
    paddingVertical: 8,
    paddingBottom: 20,
  },
  choiceItem: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  choiceText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.text_dark,
    flex: 1,
    textAlign: 'left',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border_dark,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 14,
    color: colors.background_dark,
    fontFamily: fonts.bold,
    textAlign: 'left',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border_dark,
  },
  doneButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.background_dark,
  },
})

const SearchIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.7508 18.7508L13.5538 13.5538M13.5538 13.5538C14.9604 12.1472 15.7506 10.2395 15.7506 8.25028C15.7506 6.26108 14.9604 4.35336 13.5538 2.94678C12.1472 1.54021 10.2395 0.75 8.25028 0.75C6.26108 0.75 4.35336 1.54021 2.94678 2.94678C1.54021 4.35336 0.75 6.26108 0.75 8.25028C0.75 10.2395 1.54021 12.1472 2.94678 13.5538C4.35336 14.9604 6.26108 15.7506 8.25028 15.7506C10.2395 15.7506 12.1472 14.9604 13.5538 13.5538Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
