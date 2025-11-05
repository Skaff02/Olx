import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import fonts from '../../theme/fonts'

interface CategorySectionHeaderProps {
  title: string
}

const CategorySectionHeader = ({ title }: CategorySectionHeaderProps) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  )
}

export default CategorySectionHeader

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.text_dark,
    textAlign: 'left',
  },
})

