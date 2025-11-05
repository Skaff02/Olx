import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import { SvgXml } from 'react-native-svg'
import { useTranslation } from 'react-i18next'

interface SubCategoryItemProps {
  item: any
  onPress: (item: any) => void
}

const SubCategoryItem = ({ item, onPress }: SubCategoryItemProps) => {
  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  
  const displayName = isArabic && item.name_l1 ? item.name_l1 : item.name
  return (
    <TouchableOpacity 
      style={styles.subCategoryItem} 
      activeOpacity={0.8}
      onPress={() => onPress(item)}
    >
      <Text style={styles.subCategoryName}>{displayName}</Text>
      {item.children && item.children.length > 0 && (
        <SvgXml xml={isArabic ? ArrowLeftIcon : ArrowRightIcon} height={14} />
      )}
    </TouchableOpacity>
  )
}

export default SubCategoryItem

const styles = StyleSheet.create({
  subCategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  subCategoryName: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.text_dark,
    flex: 1,
    textAlign: 'left',
  },
})

const ArrowRightIcon = `<svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 0.75L8.25 8.25L0.75 15.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const ArrowLeftIcon = `<svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25 0.75L0.75 8.25L8.25 15.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

