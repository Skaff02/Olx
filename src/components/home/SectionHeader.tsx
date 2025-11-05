import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import fonts from '../../theme/fonts'
import colors from '../../theme/colors'

const SectionHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity activeOpacity={0.8}>
        <Text style={styles.seeAllText}>See All</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SectionHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontFamily: fonts.bold,
        color: colors.text_dark,
    },
    seeAllText: { 
        fontSize: 14,
        fontFamily: fonts.semiBold,
        color: colors.see_all_text_dark,
        textDecorationLine: 'underline',
    }
})