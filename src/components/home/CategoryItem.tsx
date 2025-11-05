import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import fonts from '../../theme/fonts'
import colors from '../../theme/colors'

const CategoryItem = ({ category }: { category: { id: string, name: string, image: string } }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Image source={{ uri: category.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>{category.name}</Text>
    </TouchableOpacity>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 6,
    },
    image: { 
        height: 65,
        width: 65,
        resizeMode: 'cover',
    },
    name: { 
        fontSize: 12,
        fontFamily: fonts.medium,
        color: colors.text_dark,
        width: 70,
        textAlign: 'center',
    }
})