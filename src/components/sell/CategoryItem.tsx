import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'
import { SvgXml } from 'react-native-svg'
import { useTranslation } from 'react-i18next'

interface CategoryItemProps {
  item: any
  onPress: (item: any) => void
  getCategoryImage: (name: string, nameShort?: string) => string
}

const CategoryItem = ({ item, onPress, getCategoryImage }: CategoryItemProps) => {
  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  
  const displayName = isArabic && item.name_l1 ? item.name_l1 : (item.nameShort || item.name)
  return (
    <TouchableOpacity 
      style={styles.categoryItem} 
      activeOpacity={0.8} 
      onPress={() => onPress(item)}
    >
      <Image source={{ uri: getCategoryImage(item.name, item.nameShort) }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{displayName}</Text>
      <SvgXml xml={isArabic ? ArrowLeftIcon : ArrowRightIcon} height={17} />
    </TouchableOpacity>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    resizeMode: 'contain',
  },
  categoryName: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
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

